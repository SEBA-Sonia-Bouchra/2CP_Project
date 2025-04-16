import React from "react";
import { Link } from "react-router-dom";
import background from "./assets/images/ba.jpg";
import Logo from "./assets/images/Logo.png";

const LandingPage = () => {
  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }} 
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Box */}
      <div className="relative flex flex-col items-center justify-center h-full px-4">
        <div className="bg-white/20 backdrop-blur-md rounded-[70px] p-8 max-w-lg text-center shadow-lg">
          {/* Logo */}
          <div className="flex justify-center items-center w-30 h-20 mx-auto mb-4">
  <img src={Logo} alt="Binaa Logo" className="w-16 h-16 object-contain" /> 
</div>

          {/* Title */}
          <h1 className=" font-playfairdisplay text-2xl  text-white">
            Binaa: Preserve, Document & Explore Algeria’s Architectural Heritage
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-white font-montserral mt-2">
            A collaborative platform for historians, architects, and archaeologists to document and enrich Algeria’s built heritage.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center  mb-4 space-x-4 font-montserral">
            <Link to="/signin" className="px-6 py-2 bg-[#FFF8E3] text-black rounded-full shadow-md 
            border-black border hover:bg-transparent">
              Sign in
            </Link>
            <Link to="/signup" className="px-6 py-2 border border-black text-black rounded-full bg-[#FFF8E3] 
            hover:bg-transparent hover:text-black">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
