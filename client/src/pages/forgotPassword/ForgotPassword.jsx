import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.post("/auth/verify-user", { identifier });
      navigate("/change-password", { state: { userId: response.data.userId } });
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 md:py-12 bg-white">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-[500px] flex flex-col gap-6 md:gap-8"
      >
        <h1 className="text-2xl md:text-3xl text-gray-600 font-light text-center mb-4 md:mb-6">
          Reset Password
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="identifier" className="text-gray-600 text-base md:text-lg">
            Email or Username
          </label>
          <input
            type="text"
            id="identifier"
            placeholder="Enter your email or username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-4 md:p-5 border border-solid border-[#0c1d22] rounded-md
              focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-lg"
          />
        </div>

        <button 
          type="submit"
          className="w-full p-4 md:p-5 mt-4 text-white font-medium bg-[#d36252] 
            hover:bg-[#a1463a] transition-colors rounded-md text-base md:text-lg 
            cursor-pointer shadow-md"
        >
          Continue
        </button>

        {error && (
          <span className="text-red-500 text-center text-sm md:text-base mt-2">
            {error}
          </span>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
