from flask import Flask, jsonify, request
from flask_cors import CORS
from pathlib import Path
import json
import numpy as np
from PIL import Image
import tensorflow as tf

APP_DIR = Path(__file__).resolve().parent
MODEL_PATH = APP_DIR / "artifacts" / "skin_disease_model.keras"
LABELS_PATH = APP_DIR / "artifacts" / "class_names.json"
IMAGE_SIZE = (224, 224)

app = Flask(__name__)
CORS(app)

model = None
class_names = []


def load_artifacts():
    global model, class_names

    if not MODEL_PATH.exists() or not LABELS_PATH.exists():
        return

    model = tf.keras.models.load_model(MODEL_PATH)
    class_names = json.loads(LABELS_PATH.read_text())


def preprocess_image(file_storage):
    image = Image.open(file_storage.stream).convert("RGB")
    image = image.resize(IMAGE_SIZE)
    arr = np.array(image, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)


@app.get("/health")
def health():
    return jsonify(
        {
            "status": "ok",
            "model_loaded": model is not None,
            "classes": len(class_names),
            "model_path": str(MODEL_PATH),
        }
    )


@app.post("/predict-image")
def predict_image():
    if model is None:
        return jsonify({"error": "Model not loaded. Train and place artifacts first."}), 503

    if "image" not in request.files:
        return jsonify({"error": "Missing image file in form-data (key: image)."}), 400

    try:
        image_tensor = preprocess_image(request.files["image"])
        probs = model.predict(image_tensor, verbose=0)[0]
        top_idx = int(np.argmax(probs))
        top_label = class_names[top_idx] if class_names else str(top_idx)

        ranked = sorted(
            [
                {
                    "className": class_names[i] if class_names else str(i),
                    "probability": float(probs[i]),
                }
                for i in range(len(probs))
            ],
            key=lambda item: item["probability"],
            reverse=True,
        )

        return jsonify(
            {
                "topPrediction": {
                    "className": top_label,
                    "probability": float(probs[top_idx]),
                },
                "predictions": ranked[:5],
                "disclaimer": "AI prediction only. Please consult a dermatologist for diagnosis.",
            }
        )
    except Exception as exc:  # noqa: BLE001
        return jsonify({"error": f"Inference failed: {exc}"}), 500


if __name__ == "__main__":
    load_artifacts()
    app.run(host="0.0.0.0", port=5000, debug=True)
