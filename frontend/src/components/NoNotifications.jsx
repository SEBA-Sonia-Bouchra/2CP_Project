import React from 'react'
import NoNotification from '../assets/images/NoNotifications.svg'

const NoNotifications = () => {
  return (
    <div className='bg-[#FFF8E3] w-1/2 max-w-lg mx-auto p-12 text-[#213824] text-center 
    flex flex-col m-5 items-center justify-center rounded-md'>
        <img src={NoNotification} alt="SVG Icon" className="w-16 h-16" />
        <p className='pt-8 text-base'>There are no new notifications..</p>
    </div>
  )
}

export default NoNotifications