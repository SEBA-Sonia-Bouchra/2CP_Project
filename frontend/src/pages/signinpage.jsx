import React, { useState, useEffect } from "react"; 
import Background from "../assets/images/Backgroundgreen.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [savedEmails, setSavedEmails] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem("savedEmails")) || [];
    setSavedEmails(storedEmails);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
      // Save token to localStorage or context if needed
      localStorage.setItem("token", response.data.token);
      console.log(response.data.message); // "Login successful!"
      navigate("/home_page")
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      if (errorMessage.includes("password")) {
        setPasswordError(errorMessage);
      } else {
        setEmailError(errorMessage);
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
      <div className="bg-[#6E7C67] rounded-[70px] place-self-center text-[#79856F] shadow-lg mt-10 md:col-span-2 px-12 py-14 mb-10  overflow-hidden  w-[400px] ">
        <form onSubmit={handleSubmit} className="font-montserral grid place-content-center gap-4" noValidate>
          
          {/* Heading */}
          <h2 className="font-playfairdisplay text-[#FFF8E3] text-[30px] text-center drop-shadow-lg relative top-[-15px]">
            Welcome back
          </h2>

          {/* Email Input Field */}
          <div className="flex flex-col gap-1">
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
            {/* Display email error if any */}
            <div className="h-5">
                {emailError && <p className="text-red-700 text-sm">{emailError}</p>}
              </div>
          </div>

          {/* Password Input Field */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`appearance-none outline-none bg-transparent border-b border-solid w-full h-full text-[#FFF8E3] placeholder-[#FFF8E3] ${
                passwordError ? "border-red-700" : "border-[#FFF8E3]"
              }`}
            />
            {/* Display password error if any */}
            {passwordError && <p className="text-red-700 text-sm mt-1">{passwordError}</p>}
            
            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-[#232A27] text-sm underline">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-60 bg-[#FFF8E3] text-[#272A23]  p-3 rounded-full text-lg  shadow-md place-self-center mt-3 mb-3">
            Sign in
          </button>

          {/* Sign-up Link */}
          <p className="mt-4 text-[#FFF8E3] text-sm text-center">
            Don’t have an account? <Link to="/signup" className="underline text-[#232A27]">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
