import React, { useState } from "react";
import Background from "../assets/images/Backgroundgreen.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const SetNewPassword = () => {
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Navigation hook

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Clear errors when user types
    setFormErrors({ ...formErrors, [name]: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    // Password validation
    if (!formValues.password.trim()) {
      errors.password = "Password is required!";
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }

    // Confirm Password validation
    if (!formValues.confirmPassword.trim()) {
      errors.confirmPassword = "Confirming password is required!";
    } else if (formValues.confirmPassword !== formValues.password) {
      errors.confirmPassword = "Passwords don't match!";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const email = localStorage.getItem("signupEmail");
        const response = await axios.post("http://localhost:5000/api/user/reset-password", {
          email,
          newPassword: formValues.password,
          confirmPassword: formValues.confirmPassword
        });
        alert("Your password has been reset successfully. You can now sign in with your new password")
        navigate("/signin");
      } catch (error) {
        console.error("Password reset error:", error);
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    }
  };

  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-3 md:h-screen bg-[#FFF8E3]">
      
      {/* Left Side (Image Section) */}
      <div className="col-span-1">
        <img
          src={Background}
          alt="background"
          className="sm:w-full md:h-screen md:w-full object-cover rounded-br-[50px] rounded-tr-[50px] min-w-full"
        />
      </div>

      {/* Right Side (Form Section) */}
      <div className="bg-[#6E7C67] rounded-[70px] place-self-center shadow-lg mt-10 md:col-span-2 px-12 py-14 mb-10 overflow-hidden w-[400px]">
        <form onSubmit={handleSubmit} className="font-montserral grid place-content-center gap-4" noValidate>
          
          {/* Heading */}
          <h2 className="font-playfairdisplay text-[#FFF8E3] text-[30px] text-center drop-shadow-lg relative top-[-15px]">
            Set New Password
          </h2>

          {/* Password Input Field */}
          <div className="flex flex-col gap-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="appearance-none outline-none bg-transparent border-b border-[#FFF8E3] w-full text-[#FFF8E3] placeholder-[#FFF8E3]  p-2"
              value={formValues.password}
              onChange={handleChange}
            />
            {formErrors.password && <p className="text-red-700 text-sm">{formErrors.password}</p>}
          </div>

          {/* Confirm Password Input Field */}
          <div className="flex flex-col gap-2">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="appearance-none outline-none bg-transparent border-b border-[#FFF8E3] w-full text-[#FFF8E3] placeholder-[#FFF8E3]  p-2"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPassword && <p className="text-red-700 text-sm">{formErrors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-60 bg-[#FFF8E3] text-[#272A23] p-3 rounded-full text-lg  shadow-md">
  Set password
</button>

          
          {/* Back to Login */}
          <p className="mt-4 text-[#FFF8E3] text-sm text-center">
            Remember your password?{" "}
            <span onClick={() => navigate("/signin")} className="underline text-[#232A27] cursor-pointer">
              Sign in 
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
