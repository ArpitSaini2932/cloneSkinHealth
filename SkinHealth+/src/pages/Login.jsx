import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { account } from "../lib/appwrite";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setMessage("");
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      dispatch(login({ email: userData.email, name: userData.name }));
      navigate("/skin-analysis");
    } catch (error) {
      setMessage(error?.message || "Unable to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-bold text-center text-black mb-2">Welcome Back!</h1>
        <p className="text-center text-gray-500 mb-6">Securely log in and take control of your skin health.</p>

        <div className="text-center text-gray-400 mb-4">Sign in with your email</div>

        <input
          type="email"
          placeholder="Enter your Email id"
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          New User? <a href="/signup" className="text-blue-500 hover:underline">Sign Up here</a>
        </p>
        {message && <p className="mt-4 text-center text-red-500 text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
