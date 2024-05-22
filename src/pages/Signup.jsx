import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        username,
        email,
        password,
      });
      const { access_token, role } = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);
      if (role === "user") {
        navigate("/home");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        localStorage.setItem("role", role);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(null);
  };

  return (
    <div className="bg-[#efe3b8] min-h-screen flex justify-center items-center">
      <div className="max-w-lg w-full p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            className="w-[57px] h-[67px] mb-4"
            src="/src/assets/images/logo.png"
            alt="Logo"
          />
          <p className="text-center [font-family:'Inter-Black',Helvetica] text-black text-[40px] mb-2">
            Create an account
          </p>
          <p className="[font-family:'Inter-Regular',Helvetica] text-[15px] text-center">
            To get glowing skin
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <label
              className="[font-family:'Inter-Regular',Helvetica] text-black text-[16px] flex"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              className="block w-full h-[50px] bg-[#efe3b8] border border-solid border-[#a6603a] mt-2 px-4"
              placeholder="Your username"
              value={username}
              onChange={handleInputChange(setUsername)}
            />
          </div>
          <div>
            <label
              className="[font-family:'Inter-Regular',Helvetica] text-black text-[16px] flex"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="block w-full h-[50px] bg-[#efe3b8] border border-solid border-[#a6603a] mt-2 px-4"
              placeholder="example@gmail.com"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
          </div>
          <div>
            <label
              className="[font-family:'Inter-Regular',Helvetica] text-black text-[16px] flex"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              // className="block w-full h-[50px] bg-[#efe3b8] border border-solid border-[#a6603a] mt-2 px-4"
              //
              className="block w-full h-12 bg-[#efe3b8] border border-solid border-[#a6603a] mt-2 px-4"
              value={password}
              onChange={handleInputChange(setPassword)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            className="w-full h-[50px] bg-[#a6603a] rounded-[30px] flex items-center justify-center mt-4"
            onClick={handleSignup}
          >
            <span className="[font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-black text-[16px]">
              Sign Up
            </span>
          </button>
        </div>
        <p className="text-center [font-family:'Inter-Medium',Helvetica] text-[#1e1e1e] text-[16px] mt-8">
          <span className="font-medium">Already have an account? </span>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
