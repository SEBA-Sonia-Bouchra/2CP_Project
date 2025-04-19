import React from 'react'
import image from '../assets/images/background.png'
import { useState,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [error, setError] = useState(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  }
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }
  
    const handleVerify = async () => {
      try {
        const otpString = otp.join('').trim();
        const email = localStorage.getItem("signupEmail"); // Get stored email
        if (!email) {
         console.log("email error ");
         setError("Email not found. Please sign up again.");
         return;
        }
        const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
          email,
          otp: otpString,
        });
        if (response.status === 200) {
          navigate('/email-approval'); // redirect to email approval page
        }
      } catch (err) {
        setError(err.response?.data?.message || "Invalid code");
      }
    }
  return (
    <>
      <div className='sm:flex gap-8 sm:flex-col md:grid md:grid-cols-3 md:h-screen'>
        <div className=' col-span-1 '>
          <img src={image} alt="background" className='sm:w-full md:h-screen md:w-full object-cover rounded-br-[50px] 
          rounded-tr-[50px] min-w-full'/>
        </div>
        <div className='bg-[#b57d57]/30 rounded-[100px] place-self-center text-[#b57d57]
        shadow-lg mt-10 md:col-span-2 px-20 py-14 mb-10 md:mr-24 flex-1 overflow-hidden place-content-center'>
          <div className='font-montserral grid place-content-center gap-8'>
            <h2 className='font-playfairdisplay text-[#b57d57] text-[30px] text-center drop-shadow-lg'>
              Email verification
            </h2>  
            <p className='text-center max-w-[300px]'>We sent you a verification code, please check your email inbox.</p>
            <div className='flex place-content-center gap-3'>
             {otp.map((digit, index) => (
             <input key={index} type="text" maxLength="1" value={digit} onChange={(e) => handleChange(index, e)}
             onKeyDown={(e) => handleKeyDown(index, e)} ref={(el) => (inputRefs.current[index] = el)}
             className="w-12 h-14 text-center rounded-md focus:outline-none focus:border-blue-500 text-xl drop-shadow"
             />
            ))}
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className='flex place-content-center'>
              <button type='submit' className='bg-[#b57D57] rounded-[50px] object-cover text-[20px] text-[#FFF8E3] px-8 py-2
              drop-shadow-md mt-3 mb-3 font-montserral place-delf-center' onClick={handleVerify} >Verify</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
