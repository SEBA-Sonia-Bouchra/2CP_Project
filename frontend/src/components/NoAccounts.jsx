import React from 'react';
import UserPlusIcon from '../assets/images/user-plus.svg';

const NoAccounts = () => {
  return (
    <div className='flex flex-col items-center pt-12 justify-center'>
        <img src={UserPlusIcon} alt="user plus icon" className='w-12 h-12'/>
        <p className='text-[#213824] text-lg pt-5 text-center'>There are no pending account requests..</p>
    </div>
  )
}

export default NoAccounts