import React from 'react'
import icon from '../assets/images/icon-placeholder.png'
import { useState } from 'react';
import edit from '../assets/images/edit.svg'

export default function ModificationNormal() {
  const [isEditing,setIsEditing]=useState(false);
  const [formValues,setFormValues]=useState({firstName:"",lastName:""});
  const [image,setImage]=useState("");
  const handleSave = () => {
    setIsEditing(false);
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
    }
  };
  return (
    <>
      <div className='bg-[#FFFFFF] min-h-screen min-w-screen flex place-content-center overflow-x-hidden pt-32 overflow-y-hidden pb-6 font-montserral'>
        <form action="" className='bg-[#213824] bg-opacity-[46%] flex flex-col rounded-bl-[20px] rounded-tr-[20px] rounded-br-[70px]
         rounded-tl-[70px] items-center self-center drop-shadow px-20 py-6  md:px-0 gap-14 md:py-14'>
        <div className='grid md:grid-cols-2 gap-14 md:gap-28'>
          <div className='justify-center items-center pt-10 md:pt-0 flex md:pl-40 relative'>
            <img src={image || icon} alt="icon" className='w-48 h-48 md:min-w-[220px] md:min-h-[220px] rounded-[50%]'/>
            {isEditing && <input type="file" accept="image/*" className="hidden" id="imageUpload" onChange={handleImageChange}/>}
            <label htmlFor="imageUpload" className={`absolute bottom-3 right-4 p-1 rounded-full ${isEditing && 'cursor-pointer' } shadow-md
              bg-[#213824] flex items-center justify-center w-14 h-14`}>
              <img src={edit} alt="update-image" className="w-6 h-6 flex-none" />
            </label>
          </div>
          <div className='flex justify-center md:pr-40 flex-col text-[#213824] gap-2 md:gap-4'>
              <div className='flex flex-col '>
                <label htmlFor="first-name" className='text-lg md:text-xl'>First name</label>
                {isEditing ? (<input type="text" className='appearance-none outline-none rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8]'  maxLength={30}
                 name='firstName' value={formValues.firstName} onChange={handleChange}/>) : (<p className='rounded-[5px] py-1 px-1 md:py-2 md:px-2
                 bg-[#DFD8C8] h-8 md:h-10'> {formValues.firstName}</p>)}
              </div>
              <div className='flex flex-col '>
                <label htmlFor="last-name" className='text-lg md:text-xl'>Last name</label>
                {isEditing ? (<input type="text" className='appearance-none outline-none rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8]' maxLength={30}
                 name='lastName' value={formValues.lastName} onChange={handleChange}/>) : (<p className='rounded-[5px] py-1 px-1 md:py-2 md:px-2
                  bg-[#DFD8C8] h-8 md:h-10'>{formValues.lastName}</p>)}
              </div>
              <div className='flex flex-col '>
                <label htmlFor="email" className='text-lg md:text-xl'>Email address</label>
                <p type="email" className={`appearance-none outline-none rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8] h-8 md:h-10
                ${isEditing && 'bg-[#DFD8C8] bg-opacity-[60%]'}`} />
              </div>
          </div>
        </div>
          <div className={`flex gap-4 justify-center ${!isEditing && 'md:ml-20 md:self-end md:mr-[175px]'}`}>
              <button className={` bg-[#213824] bg-opacity-80 rounded-[15px] px-10 ${!isEditing ? ' py-2 text-[#FFFFFF]' : 
              'bg-transparent text-[#213824] border border-[#213824]'} text-xl drop-shadow`} onClick={(e)=>{e.preventDefault();
               setIsEditing(!isEditing)}}>{isEditing ? 'Cancel' : 'Edit profile'}</button>
              {isEditing && (<button className='text-[#FFFFFF] bg-[#213824] bg-opacity-80 py-2 rounded-[15px] px-6
              text-xl drop-shadow' onClick={handleSave}>Save changes</button>)}
          </div>
        </form>
      </div>
    </>
  )
}
