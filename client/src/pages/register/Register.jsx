import React, { useState } from "react";
import ToggleSwitch from "./toggleSwitch";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    general: ""
  });
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear specific error when user starts typing in the field
    if (name === 'username') {
      setErrors(prev => ({ ...prev, username: '' }));
    } else if (name === 'email') {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    
    setUser(prev => ({ ...prev, [name]: value }));
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(user.username)) {
      errors.username = "Username can only contain letters, numbers and underscores";
      isValid = false;
    } else if (user.username.length < 5 || user.username.length > 20) {
      errors.username = "Username must be at least 5 and at most 20 characters long";
      isValid = false;
    } 

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else if (!passwordRegex.test(user.password)) {
      errors.password = "Password must contain at least one uppercase letter, one lowercase letter and one number";
      isValid = false;
    }
  

    setValidationErrors(errors);
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/login");
    } catch (err) {
      if (err.response.data.includes("E11000 duplicate key error")) {
        if (err.response.data.includes("username")) {
          setErrors(prev => ({...prev, username: "Username is already taken"}));
        } else if (err.response.data.includes("email")) {
          setErrors(prev => ({...prev, email: "Email is already registered"}));
        }
      }
      else {
        setErrors(prev => ({...prev, general: err.response.data}));
      }
    }
  };

  return (
    <div className="register flex items-center justify-center">
      <form
        className="w-[500px] flex gap-[120px] p-[100px] pl-0 pr-0"
        onSubmit={handleSubmit}
      >
        <div className="left flex-1 flex flex-col gap-2.5 justify-between">
          <h1 className="text-[#555555] font-semibold text-2xl self-center">
            Sign up
          </h1>
          <label htmlFor="username" className="color-[gray] text-[18px]">
            Username<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full p-[20px] border border-solid  rounded-md appearance-none
               focus:outline-none focus:ring-1 focus:ring-gray-200 border-[#0c1d22] focus:[#071013] shadow-lg"
            name="username"
            type="text"
            id="username"
            placeholder="John Doe"
            onChange={handleChange}
            value={user.username}
          />
          {validationErrors.username && (
            <span className="text-red-500 text-sm">
              {validationErrors.username}
            </span>
          )}
          {errors.username && <span className="text-red-500">{errors.username}</span>}
          <label htmlFor="email" className="color-[gray] text-[18px]">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full p-[20px] border border-solid  rounded-md appearance-none
               focus:outline-none focus:ring-1 focus:ring-gray-200 border-[#0c1d22] focus:[#071013] shadow-lg"
            name="email"
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            onChange={handleChange}
            value={user.email}
          />
          {validationErrors.email && (
            <span className="text-red-500 text-sm">
              {validationErrors.email}
            </span>
          )}
          {errors.email && <span className="text-red-500">{errors.email}</span>}
          <label htmlFor="password" className="color-[gray] text-[18px]">
            Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={handleChange}
            value={user.password}
             className="w-full p-[20px] border border-solid  rounded-md appearance-none
               focus:outline-none focus:ring-1 focus:ring-gray-200 border-[#0c1d22] focus:[#071013] shadow-lg"
          />
           <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {validationErrors.password && (
            <span className="text-red-500 text-sm">
              {validationErrors.password}
            </span>
          )}
          <label htmlFor="file" className="color-[gray] text-[18px]">
            Profile Picture
          </label>
          <input
           className="w-full p-[20px] border border-solid  rounded-md appearance-none
               focus:outline-none focus:ring-1 focus:ring-gray-200 border-[#0c1d22] focus:[#071013] shadow-lg"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          {errors.general && <span className="text-red-500">{errors.general}</span>}
          <button
            className="bg-[#d36252] hover:bg-[#a1463a] transition-all text-[white]
             p-[20px] rounded-md border-none font-medium text-[18px] cursor-pointer mt-2.5"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
