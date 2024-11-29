import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const loginData = identifier.includes("@") || 
      identifier.includes("gmail") || 
      identifier.includes(".com") || 
      identifier.includes(".net") || 
      identifier.includes(".org")
        ? { email: identifier, password }
        : { username: identifier, password };

    try {
      const response = await newRequest.post("/auth/login", loginData);
      if (response?.data) {
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (err) {
      console.log('Login error:', err);
      setError(err?.response?.data || "Login failed. Please try again.");
    }
};



  return (
    <div className="container flex justify-center items-center h-full mx-auto px-4 py-8">
      <div
        className="w-[500px] min-h-full border border-solid rounded-md shadow-lg shadow-[#efc949] 
       flex items-center justify-center px-4 py-8 md:py-12 "
      >
        <div className="w-full max-w-[350px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:gap-8"
          >
            <h1 className="text-2xl md:text-3xl text-gray-600 font-light text-center mb-4 md:mb-6">
              Sign in
            </h1>

            {/* Identifier Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="identifier"
                className="text-gray-600 text-base md:text-lg"
              >
                Username or Email
              </label>
              <input
                name="identifier"
                type="text"
                id="identifier"
                placeholder="Enter username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full p-4 md:p-5 border border-solid border-[#0c1d22] rounded-md
                focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-lg"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-gray-600 text-base md:text-lg"
              >
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 md:p-5 border border-solid border-[#0c1d22] rounded-md
                  focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 
                  hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-4 md:p-5 mt-4 text-white font-medium bg-[#d36252] 
              hover:bg-[#a1463a] transition-colors rounded-md text-base md:text-lg 
              cursor-pointer shadow-md"
            >
              Login
            </button>

            {error && (
              <span className="text-red-500 text-center text-sm md:text-base self-center">
                {error}
              </span>
            )}

            {/* Forgot Password Link */}
            <Link
              to="/forgot-password"
              className="text-gray-600 text-center text-base md:text-lg 
              hover:text-[#d36252] transition-colors"
            >
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
