# SkinHealth+

SkinHealth+ is a Vite + React application for skin analysis, consultations, and community interaction.

## Tech stack
- React 19 + Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Teachable Machine image model integration (frontend)
- Flask + TensorFlow backend for custom image model inference/training

## Frontend setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```

## Train your own skin disease model (DermNet dataset)
Using the dataset you shared (`https://www.kaggle.com/datasets/shubhamgoel27/dermnet`):

1. Download and extract the dataset so each disease is in a separate folder:
   ```
   dataset_root/
     class_a/
     class_b/
     ...
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Train model:
   ```bash
   python train_dermnet.py --dataset-dir /path/to/dataset_root --output-dir artifacts --epochs 10
   ```
4. Start inference API:
   ```bash
   python main.py
   ```

## Backend API
- `GET /health` → returns model load status
- `POST /predict-image` (multipart form-data, key: `image`) → returns top prediction + top-5 confidences

> ⚠️ This is an AI screening tool and not a medical diagnosis. Always consult a dermatologist.
