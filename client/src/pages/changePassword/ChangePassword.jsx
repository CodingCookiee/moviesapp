import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setError("");
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      navigate("/forgot-password");
      return;
    }

    const validationError = validatePassword(passwords.newPassword);
    if (validationError) {
      setValidationError(validationError);
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await newRequest.put("/auth/change-password", {
        userId,
        newPassword: passwords.newPassword,
      });
      setSuccessMessage(
        "Password changed successfully. Redirecting to login page...",
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="container flex justify-center items-center h-full mx-auto px-4 py-8">
      <div
        className="w-[500px] min-h-full border border-solid rounded-md shadow-lg shadow-[#efc949] 
       flex items-center justify-center px-4 py-8 md:py-12 "
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[500px] flex flex-col gap-6 md:gap-8 px-12"
        >
          <h1 className="text-2xl md:text-3xl text-gray-600 font-light text-center mb-4 md:mb-6">
            Change Password
          </h1>

          {/* New Password Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="newPassword"
              className="text-gray-600 text-base md:text-lg"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.newPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter new password"
                value={passwords.newPassword}
                onChange={handleChange}
                className="w-full p-4 md:p-5 border border-solid border-[#0c1d22] rounded-md
                focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-lg"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    newPassword: !prev.newPassword,
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 
                hover:text-gray-700 transition-colors"
              >
                {showPasswords.newPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-gray-600 text-base md:text-lg"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={passwords.confirmPassword}
                onChange={handleChange}
                className="w-full p-4 md:p-5 border border-solid border-[#0c1d22] rounded-md
                focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-lg"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 
                hover:text-gray-700 transition-colors"
              >
                {showPasswords.confirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-4 md:p-5 mt-4 text-white font-medium bg-[#d36252] 
            hover:bg-[#a1463a] transition-colors rounded-md text-base md:text-lg 
            cursor-pointer shadow-md"
          >
            Change Password
          </button>

          {validationError && (
            <span className="text-red-500 text-center text-sm md:text-base">
              {validationError}
            </span>
          )}
          {error && (
            <span className="text-red-500 text-center text-sm md:text-base">
              {error}
            </span>
          )}
          {successMessage && (
            <span className="text-green-600 text-center text-sm md:text-base">
              {successMessage}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
