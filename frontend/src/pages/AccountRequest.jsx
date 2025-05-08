import React, { useState, useEffect } from 'react'
import clock from '../assets/images/clock.png'
import image from '../assets/images/background.png'
import { useNavigate } from 'react-router-dom';
import RejectRequest from './RejectRequest'; 
import axios from "axios"

const AccountRequest = () => {
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();
  
    useEffect(() => {
      const email = sessionStorage.getItem("signupEmail"); // assuming you saved it after signup
      if (!email) return;
  
      const checkStatus = async () => {
        try {
          const res = await axios.post("http://localhost:5000/api/auth/check-status", { email });
          setStatus(res.data.status);
        } catch (err) {
          console.error("Failed to check status:", err);
        }
      };
  
      checkStatus();
  
      // Optional: poll every 30 seconds
      const interval = setInterval(checkStatus, 30000);
      return () => clearInterval(interval);
    }, []);  
    useEffect(() => {
      if (status === "rejected") {
        alert("Your account creation request was reviewed.");
        navigate('/request-rejected');
      } else if (status === "accepted") {
        alert("Your account creation request was reviewed.");
        navigate('/signin');
      }
    }, [status, navigate]);
  return (
    <>
      <div className='sm:flex gap-8 sm:flex-col md:grid md:grid-cols-3 md:h-screen'>
        <div className=' col-span-1 '>
          <img src={image} alt="background" className='sm:w-full md:h-screen md:w-full object-cover rounded-br-[50px] 
          rounded-tr-[50px] min-w-full'/>
        </div>
        <div className='bg-[#b57d57]/30 rounded-[100px] place-self-center text-[#b57d57]
        shadow-lg mt-10 md:col-span-2 px-14 py-28 mb-10 md:mr-24 flex-1 overflow-hidden place-content-center'>
          <div className='font-montserral grid place-content-center gap-4'> 
            <img src={clock} alt="clock" className='place-self-center w-[100px]' />
            <p className='text-center max-w-[300px]'>Your account creation request is being reviewed.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountRequest
