import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const adminEmail = "admin@example.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });
      const { access_token, role } = response.data;

      localStorage.setItem("token", access_token);

      // Check if the email is the admin email
      if (email === adminEmail) {
        localStorage.setItem("role", "admin");
        navigate("/admin");
      } else {
        localStorage.setItem("role", role);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(null);
  };

  return (
    <div className="bg-[#efe3b8] min-h-screen flex justify-center items-center">
      <div className="max-w-lg w-full p-8">
        <img
          className="w-16 h-16 mx-auto mb-8"
          alt="Celestial skins high"
          src="/src/assets/images/logo.png"
        />
        <div className="mb-8 text-center">
          <p className="text-3xl font-black text-black">Welcome back</p>
          <p className="text-base">
            Don’t have an account yet?{" "}
            <Link to="/signup" className="font-bold text-[#a6603a]">
              Signup
            </Link>
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <label className="text-black text-lg flex" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="block w-full h-12 bg-[#efe3b8] border border-solid border-[#a6603a] mt-2 px-4"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
          </div>
          <div>
            <label className="text-black text-lg flex" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full h-12 bg-[#efe3b8] border border-solid border-[#a6603a] mt-2 px-4"
              placeholder="Enter your password"
              value={password}
              onChange={handleInputChange(setPassword)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            className="w-full h-12 bg-[#a6603a] rounded-[30px] flex items-center justify-center mt-4"
            onClick={handleLogin}
          >
            <span className="font-extrabold text-black text-lg">Login</span>
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center text-[#a6603a]">
            <input type="checkbox" />
            <span className="ml-2">Remember me</span>
          </label>
          <div className="text-[#a6603a]">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
