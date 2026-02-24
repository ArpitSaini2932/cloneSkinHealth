import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, ID } from "../lib/appwrite";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) return setMessage("Please agree to the terms & conditions.");
    if (formData.password !== formData.confirmPassword) return setMessage("Passwords do not match.");

    try {
      setIsLoading(true);
      setMessage("");
      await account.create(ID.unique(), formData.email, formData.password, formData.name);
      setMessage("Signup successful. Please login.");
      navigate("/login");
    } catch (error) {
      setMessage(error?.message || "Unable to sign up right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-12">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-semibold">Glow starts here – Sign up for <span className="text-blue-600">smarter</span> skincare today</h2>
          <p className="mt-4 text-gray-600">Type your email address & name to begin</p>
          <ul className="mt-6 space-y-4 text-gray-700">
            <li>✔ Get instant insights and personalized skincare recommendations.</li>
            <li>✔ Connect with top dermatologists anytime, anywhere.</li>
            <li>✔ Join a community that cares about your skin health.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md">
          <input type="text" name="name" placeholder="Enter your Name" className="w-full p-3 mb-4 border rounded" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Enter your Email id" className="w-full p-3 mb-4 border rounded" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Enter Your Password" className="w-full p-3 mb-4 border rounded" value={formData.password} onChange={handleChange} required />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Your Password"
            className="w-full p-3 mb-4 border rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label className="flex items-center mb-4 text-sm">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="mr-2" />
            I agree to all statements including <a href="#" className="text-blue-600 underline">Terms & Conditions</a>
          </label>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-60">
            {isLoading ? "Signing up..." : "Sign Up Now"}
          </button>
          <p className="mt-4 text-sm">Already have an account? <a href="/login" className="text-blue-600 underline">Log in here!</a></p>
          {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
