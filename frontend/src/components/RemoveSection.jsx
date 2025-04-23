import React from 'react'

export default function RemoveSection() {
  return (
    <>
      <div className='bg-white flex items-center justify-center min-h-screen bg-black bg-opacity-25 font-montserral relative'>
        <p>Do you want to delete this section?</p>
        <div className='flex'>
            <button className='text-[#4F3726] border border-[#4F3726] rounded-full'>Cancel</button>
            <button className='bg-[#4F3726] text-white rounded-full'>Confirm</button>
        </div>
      </div>
    </>
  )
}
