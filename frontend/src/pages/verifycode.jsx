import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/Backgroundgreen.png";

export default function VerifyCode() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate(); // Move useNavigate inside the component

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = otp.join("");
    if (enteredCode.length === 4) {
      navigate("/set_new_password"); // Ensure this matches App.jsx
    } else {
      alert("Please enter the full verification code.");
    }
  };

  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-3 md:h-screen bg-[#FFF8E3]">
      {/* Left Side (Image) */}
      <div className="col-span-1 flex items-center justify-center">
        <img
          src={image}
          alt="background"
          className="sm:w-full md:h-screen md:w-full object-cover rounded-br-[50px] rounded-tr-[50px] min-w-full"
        />
      </div>

      {/* Right Side (Verification Form) */}
      <div className="md:col-span-2 flex items-center justify-center">
        <div className="bg-[#6E7C67] p-12 rounded-[70px] shadow-lg w-[400px] text-center">
          <h2 className="font-playfairdisplay text-3xl text-[#FFF8E3] mb-4">
            Forgot Password
          </h2>
          <p className="text-[#FFF8E3] text-sm mb-6">
            Please enter the code sent to your email
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-14 text-center text-lg bg-[#FFF8E3] text-[#272A23] rounded-md shadow-md outline-none focus:border-[#272A23] border border-transparent"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="button"
            onClick={handleVerify}
            className="w-60 bg-[#FFF8E3] text-[#272A23] p-3 rounded-full text-lg  shadow-md"
          >
            Verify
          </button>

          {/* Resend Code */}
          <p className="mt-4 text-[#FFF8E3] text-sm">
            <a href="/resend-code" className="underline">
              Resend code
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
