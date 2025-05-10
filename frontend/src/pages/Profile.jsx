import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import icon from '../assets/images/icon-placeholder.png';

export default function Profile() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null);
  const localhost = "http://localhost:5000";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${id}`);
        setUser(response.data.profile); 
      } catch (error) {
        console.error("Profile error:", error.message);
        setError("Failed to load profile");
      }
    };

    getData();
  }, [id]);

  if (error) {
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className='bg-[#FFFFFF] min-h-screen flex place-content-center overflow-x-hidden font-montserral pt-16 mb-14 md:mb-28 min-w-screen'>
      <div className='bg-[#213824] bg-opacity-[40%] flex flex-col rounded-bl-[20px] rounded-tr-[20px] py-10
        rounded-br-[70px] rounded-tl-[70px] items-center self-center drop-shadow-xl gap-14 text-[#213824] px-10 md:px-0'>
        <div className='grid md:grid-cols-2 gap-20 md:gap-40'>
          {/* image + description */}
          <div className='place-content-center pt-10 md:pt-0 grid md:pl-40 gap-6 '>
            <div className="relative">
              <img src={user.profilePicture ? `${localhost}${user.profilePicture}` : icon} alt="user profile picture" className='w-[192px] h-[192px] rounded-[50%] justify-self-center object-cover object-center'/>
            </div>
            <div className='flex flex-col gap-2 flex-wrap '>
              <label htmlFor="description" className='text-lg md:text-xl drop-shadow ml-2'>Description</label>
              <div className={` rounded-[5px] p-2 bg-[#DFD8C8] break-words overflow-y-auto w-80 min-h-48 `}>
                {user.description || "No description available."}
              </div>
            </div>
          </div>

          {/* profile details */}
          <div className='grid grid-cols-2 gap-10 md:flex md:flex-col items-start md:gap-2'>
            <div className='flex flex-col'>
              <label className='text-lg md:text-xl'>First name</label>
              <p className='rounded-[5px] py-2 px-2 bg-[#DFD8C8] h-10 md:w-64 truncate'>{user.firstname}</p>
            </div>

            <div className='flex flex-col'>
              <label className='text-lg md:text-xl'>Last name</label>
              <p className='rounded-[5px] py-2 px-2 h-10 md:w-64 bg-[#DFD8C8] truncate'>{user.lastname}</p>
            </div>

            <div className='flex flex-col'>
              <label className='text-lg md:text-xl'>Email address</label>
              <p className='rounded-[5px] py-2 px-2 bg-[#DFD8C8] h-10 md:w-64 truncate'>{user.email}</p>
            </div>

            <div className='flex flex-col'>
              <label className='text-lg md:text-xl'>Role</label>
              <p className='rounded-[5px] py-2 px-2 bg-[#DFD8C8] h-10 md:w-64 capitalize truncate'>{user.role}</p>
            </div>

            <div className='flex flex-col'>
              <label className='text-lg md:text-xl'>Institution</label>
              <p className='rounded-[5px] py-2 px-2 bg-[#DFD8C8] h-10 md:w-64 truncate'>{user.institution}</p>
            </div>

            <div className='flex flex-col'>
              <label className='text-lg md:text-xl'>Level of expertise</label>
              <p className='rounded-[5px] py-2 px-2 bg-[#DFD8C8] h-10 md:w-64 truncate'>{user.levelOfExpertise}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
