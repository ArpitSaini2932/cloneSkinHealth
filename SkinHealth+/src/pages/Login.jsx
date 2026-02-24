import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = { email, name: "John Doe" }; 
    dispatch(login(userData)); 
    navigate("/skin-analysis"); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-bold text-center text-black mb-2">Welcome Back!</h1>
        <p className="text-center text-gray-500 mb-6">Securely log in and take control of your skin health.</p>

        <button className="w-full flex items-center justify-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:shadow transition mb-4">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
          <span>Sign in with Google</span>
        </button>

        <div className="text-center text-gray-400 mb-4">Or Sign in with your email</div>

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

        <div className="flex items-center justify-between mb-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Keep me Signed in
          </label>
          <a href="#" className="text-blue-500 hover:underline">Forgot Password</a>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Sign in
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          New User? <a href="/signup" className="text-blue-500 hover:underline">Sign Up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
