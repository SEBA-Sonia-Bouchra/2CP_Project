import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Background from "../assets/images/Backgroundgreen.png";
import axios from "axios"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [savedEmails] = useState(["test@example.com", "user@domain.com"]); // Example saved emails

  const navigate = useNavigate(); // Initialize useNavigate

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required!");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    setEmailError("");
    try {

      const response = await axios.post("http://localhost:5000/api/user/forgot-password", { email });
      localStorage.setItem("signupEmail", email);
  
      setSuccessMessage("A verification code has been sent to your email.");
      navigate("/verify-code");
  
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      setEmailError(errorMessage);
    }
  };

  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-3 md:h-screen bg-[#FFF8E3]">
      {/* Left Side (Image) */}
      <div className="col-span-1 flex items-center justify-center relative">
        <img
          src={Background}
          alt="background"
          className="sm:w-full md:h-screen md:w-full object-cover rounded-br-[50px] rounded-tr-[50px] min-w-full"
        />
      </div>

      {/* Right Side (Form) */}
      <div className="md:col-span-2 flex items-center justify-center">
        <div className="bg-[#6E7C67] p-10 rounded-[70px] shadow-lg w-[400px] text-center">
          <h2 className="font-playfairdisplay text-3xl text-[#FFF8E3] mb-4">
            Forgot Password
          </h2>
          <p className="text-[#FFF8E3] text-sm mb-10 font-montserral">
            Please enter your email address to receive a verification code.
          </p>

          <form onSubmit={handleSubmit} className="font-montserral">
            {/* Email Input */}
            <div className="flex flex-col gap-1 mb-4 text-left">
              <input
                type="text"
                list="emailSuggestions"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none outline-none bg-transparent border-b border-solid w-full h-full text-[#FFF8E3] placeholder-[#FFF8E3] ${
                  emailError ? "border-red-700" : "border-[#FFF8E3]"
                }`}
              />
              <datalist id="emailSuggestions">
                {savedEmails.map((savedEmail, index) => (
                  <option key={index} value={savedEmail} />
                ))}
              </datalist>
              {/* Error message in red */}
              <div className="h-5">
                {emailError && <p className="text-red-700 text-sm">{emailError}</p>}
              </div>
            </div>

            {/* Send Button */}
            <button type="submit" className="w-60 bg-[#FFF8E3] text-[#272A23] p-3 rounded-full text-lg shadow-md  place-self-center mt-3 mb-3">
  Send
</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
