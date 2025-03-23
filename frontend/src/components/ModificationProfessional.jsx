import React from 'react'
import icon from '../assets/images/icon-placeholder.png'
import edit from '../assets/images/edit.svg'
import { useState } from 'react';

export default function ModificationProfessional() {
  const [isEditing,setIsEditing]=useState(false);
  const initialValues={firstName:"",lastName:"",email:"",description:"",role:"",institution:"",expertiseLevel:""}; // input fields
  const [formValues,setFormValues]=useState(initialValues);
  const [isSelected, setSelectedValue]=useState("");
  const [image,setImage]=useState("");

  const handleSave = () => {
    setIsEditing(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setSelectedValue(e.target.value);
    setContent(e.target.value);
    if (value.description.length <= 400) { 
      setFormValues((prev) => ({...prev, [name]: value }));
    }
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
          <div className='bg-[#FFFFFF] min-h-screen flex place-content-center overflow-x-hidden font-montserral mt-56 md:mt-40 mb-14 md:mb-28
          min-w-screen'>
            <form action="" className='bg-[#213824] bg-opacity-[40%] flex flex-col rounded-bl-[20px] rounded-tr-[20px] py-10
             rounded-br-[70px] rounded-tl-[70px] items-center self-center drop-shadow-xl gap-14 text-[#213824] px-10 md:px-0'>
              <div className='grid md:grid-cols-2 gap-20 md:gap-40'>
               <div className='place-content-center pt-10 md:pt-0 grid md:pl-40 gap-6 '>
                <div className="relative">
                  <img src={image || icon} alt="icon" className='w-[192px] h-[192px] rounded-[50%] justify-self-center'/>
                  {isEditing && <input type="file" accept="image/*" className="hidden" id="imageUpload" onChange={handleImageChange}/>}
                  <label htmlFor="imageUpload" className={`absolute bottom-3 right-16 p-1 rounded-full ${isEditing && 'cursor-pointer'} shadow-md
                   bg-[#213824] flex items-center justify-center w-12 h-12`}>
                    <img src={edit} alt="update-image" className="w-6 h-6 flex-none " />
                  </label>
                </div>
                <div className='flex flex-col gap-2 flex-wrap '>
                   <label htmlFor="first-name" className='text-lg md:text-xl drop-shadow ml-2'>Description</label>
                   {isEditing ? (<><textarea type='text' className='appearance-none outline-none rounded-[5px]
                    w-80 h-48 bg-[#DFD8C8] resize-none p-2' maxLength={400} name='description' value={formValues.description} onChange={handleChange} rows={3}/>
                    <p className="text-sm text-gray-700">{400 - formValues.description.length} characters left</p></>)
                    : (<div className={` rounded-[5px] p-2 bg-[#DFD8C8] break-words overflow-y-auto w-80 min-h-48 `}>
                      {formValues.description}
                      </div>)}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-10 md:flex md:flex-col items-start md:gap-2'>
                  <div className='flex flex-col'>
                    <label htmlFor="first-name" className='text-lg md:text-xl'>First name</label>
                    {isEditing ? (<input type='text' className='appearance-none outline-none rounded-[5px] md:w-64
                    py-2 px-2 bg-[#DFD8C8]' maxLength={30} name='firstName' value={formValues.firstName} onChange={handleChange}/>)
                    : (<p className={`rounded-[5px] py-2 px-2 bg-[#DFD8C8] h-10 md:w-64 truncate`}>{formValues.firstName}</p>)}
                  </div>
                  <div className='flex flex-col '>
                    <label htmlFor="last-name" className='text-lg md:text-xl'>Last name</label>
                    {isEditing ? (<input type='text' className='appearance-none outline-none rounded-[5px] md:w-64
                    py-2 px-2 bg-[#DFD8C8]' maxLength={30} name='lastName' value={formValues.lastName} onChange={handleChange}/>)
                    : (<p className={`rounded-[5px] py-2 px-2 h-10 md:w-64 bg-[#DFD8C8] truncate`}>
                      {formValues.lastName}</p>)}
                  </div>
                  <div className='flex flex-col '>
                    <label htmlFor="email" className='text-lg md:text-xl'>Email address</label>
                    <p className={`rounded-[5px] py-2 px-2 bg-[#DFD8C8] h-10 md:w-64 truncate ${isEditing && 'bg-[#DFD8C8] bg-opacity-[60%]'}`}>
                    {formValues.email}</p>
                  </div>
                  <div className='flex flex-col '>
                    <label htmlFor="role" className='text-lg md:text-xl'>Role</label>
                    <p className={`rounded-[5px] py-2 px-2 bg-[#DFD8C8] h-10 md:w-64 truncate ${isEditing && 'bg-[#DFD8C8] bg-opacity-[60%]'}`}>
                    {formValues.role}</p>
                  </div>
                  <div className='flex flex-col '>
                    <label htmlFor="institution" className='text-lg md:text-xl'>Institution</label>
                    <p className={`rounded-[5px] px-2 py-2 bg-[#DFD8C8] h-10 md:w-64 truncate ${isEditing && 'bg-[#DFD8C8] bg-opacity-[60%]'}`}>
                    {formValues.institution}</p>
                  </div>
                  <div className={`flex flex-col ${isEditing ? 'pt-6' : 'pt-0'}`}>
                    {!isEditing ? (<label htmlFor="institution" className='text-lg md:text-xl'>Level of expertise</label>) : ''}
                    {isEditing ? (
                    <div>
                    <select type='text' className='appearance-none outline-none rounded-[5px] text-lg pl-5 cursor-pointer
                    py-2 px-2 bg-[#DFD8C8] h-10 md:w-64' name='expertiseLevel' value={formValues.expertiseLevel}
                    onChange={handleChange}>
                      <option value="" disabled className='text-center'>Level of expertise</option>
                      <option value="Junior" className='text-center'>Junior</option>
                      <option value="Senior" className='text-center'>Senior</option>
                      <option value="Master" className='text-center'>Master</option>
                    </select>
                    {!isSelected && <svg width="18" height="18" viewBox="0 0 18 18" fill="#213824" xmlns="http://www.w3.org/2000/svg"
                    className='transform translate-x-[220px] -translate-y-7'>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.2314 5.1521L9 13.5183L16.7686 5.1521L17.6479 5.96864L9 15.2818L0.352051 5.96864L1.2314 5.1521Z" fill="#213824"/>
                    </svg> }
                    </div>)
                    : (<p className='rounded-[5px] py-2 px-2 bg-[#DFD8C8] text-lg text-center h-10 md:w-64'>
                      {formValues.expertiseLevel}</p>)}
                  </div>
              </div>
              </div>
              <div className={`flex gap-4 ${!isEditing ? 'ml-20 md:self-end md:mr-[162px]' : ''} `}>
                  <button className={` bg-[#213824] bg-opacity-80 rounded-[15px] px-10 ${!isEditing ? 'mr-[92px] py-2 text-[#FFFFFF] ' : 
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
