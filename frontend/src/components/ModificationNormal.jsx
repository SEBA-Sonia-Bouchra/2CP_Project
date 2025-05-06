import React from 'react'
import icon from '../assets/images/icon-placeholder.png'
import { useState, useEffect } from 'react';
import edit from '../assets/images/edit.svg'
import useCurrentUser from '../utils/useCurrentUser';
import axios from 'axios'; 

export default function ModificationNormal() {
  const user = useCurrentUser();
  const [isEditing,setIsEditing]=useState(false);
  const [formValues,setFormValues]=useState({firstname:"",lastname:""});
  const [image,setImage]=useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSave = async (e) => {
    setIsEditing(false);
    e.preventDefault();
    
    console.log(formValues);

    const formData = new FormData();
    formData.append("firstname", formValues.firstname);
    formData.append("lastname", formValues.lastname);
    formData.append("userId", user._id); 
    if (imageFile) {
      formData.append("profilePicture", imageFile); 
    }
    
    try{
      const response = await axios.put("http://localhost:5000/api/profile/modify-profile", formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      }
    );
    console.log("Profile update success:", response.data);
    }catch (error){
      console.error("Profile error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Update failed.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setImageFile(file);
      }
    };
    
    useEffect(() => {
      if (user) {
        console.log(user);
        setFormValues({
          firstname: user.firstname || "",
          lastname: user.lastname || "",
        });
        if (user.profilePicture) {
          setImage(`http://localhost:5000${user.profilePicture}`); // If it's already uploaded
        }
      }
    }, [user]);

  return (
    <>
      <div className='bg-[#FFFFFF] min-h-screen min-w-screen flex place-content-center overflow-x-hidden pt-16 overflow-y-hidden pb-6 font-montserral'>
        <form action="" className='bg-[#213824] bg-opacity-[46%] flex flex-col rounded-bl-[20px] rounded-tr-[20px] rounded-br-[70px]
         rounded-tl-[70px] items-center self-center drop-shadow px-20 py-6  md:px-0 gap-14 md:py-14'>
        <div className='grid md:grid-cols-2 gap-14 md:gap-28'>
          <div className='justify-center items-center pt-10 md:pt-0 flex md:pl-40 relative'>
            <img src={image || icon} alt="icon" className='w-48 h-48 md:min-w-[220px] md:min-h-[220px] rounded-[50%] object-cover object-center'/>
            {isEditing && (
              <>
                <input type="file" accept="image/*" className="hidden" id="imageUpload" onChange={handleImageChange}/>
                <label htmlFor="imageUpload" className={`absolute bottom-3 right-6 p-1 rounded-full ${isEditing && 'cursor-pointer'} shadow-md bg-[#213824] flex items-center justify-center w-12 h-12`}>
                <img src={edit} alt="update-image" className="w-6 h-6 flex-none" />
                </label>
              </>
            )}
          </div>

          <div className='flex justify-center md:pr-40 flex-col text-[#213824] gap-2 md:gap-4'>
              <div className='flex flex-col '>
                <label htmlFor="firstname" className='text-lg md:text-xl'>First name</label>
                {isEditing ? (
                  <input type="text" className='appearance-none outline-none rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8] truncate'
                    maxLength={30} name='firstname' id='firstname' value={formValues.firstname} onChange={handleChange}/>
                ) : (
                  <p className='rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8] h-8 md:h-10'> {user?.firstname}</p>
                  )}
              </div>
              <div className='flex flex-col '>
                <label htmlFor="lastname" className='text-lg md:text-xl'>Last name</label>
                {isEditing ? (
                  <input type="text" className='appearance-none outline-none rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8]' maxLength={30}
                 name='lastname' id='lastname' value={formValues.lastname} onChange={handleChange}/>
                ) : (
                <p className='rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8] h-8 md:h-10 truncate'>{user?.lastname}</p>
                )}
              </div>
              <div className='flex flex-col '>
                <label htmlFor="email" className='text-lg md:text-xl'>Email address</label>
                <p id="email" className={`appearance-none outline-none rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8] h-8 md:h-10 truncate ${isEditing && 'bg-[#DFD8C8] bg-opacity-[60%]'}`} >
                  {user?.email}
                  </p>
              </div>
          </div>
        </div>
          <div className={`flex gap-4 justify-center ${!isEditing && 'md:ml-20 md:self-end md:mr-[175px]'}`}>
              <button className={` bg-[#213824] bg-opacity-80 rounded-[15px] px-10 ${!isEditing ? ' py-2 text-[#FFFFFF]' : 
              'bg-transparent text-[#213824] border border-[#213824]'} text-xl drop-shadow`} onClick={(e)=>{e.preventDefault(); setIsEditing(!isEditing)}}>
                {isEditing ? 'Cancel' : 'Edit profile'}
               </button>
              {isEditing && (
                <button className='text-[#FFFFFF] bg-[#213824] bg-opacity-80 py-2 rounded-[15px] px-6
              text-xl drop-shadow' onClick={handleSave}>Save changes</button>
              )}
          </div>
        </form>
      </div>
    </>
  )
}
