import React, { useState } from 'react';
import icon from '../assets/images/icon-placeholder.png';
import Accept from '../assets/images/Accept.svg';
import Reject from '../assets/images/Reject.svg';

const initialEditRequests = [
   { id: 'req1', name: 'John', surname: 'Doe', profilePicture: icon }, 
   { id: 'req2', name: 'Joe', surname: 'Smith', profilePicture: icon },
];

const EditRequests = () => {
  const [editRequests, setEditRequests] = useState(initialEditRequests);

  const handleRequest = (id) => {
    setEditRequests(editRequests.filter(request => request.id !== id));
  };

  return (
    <div className='flex flex-col text-xs w-[232px] lg:w-[300px]'>
      <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>

      {/* Requests List */}
      {editRequests.length > 0 ? (
        editRequests.map((request) => (
          <div key={request.id} className='pt-2 px-2 flex flex-row justify-between'>
            <div className='flex flex-row items-center'>
              <img src={request.profilePicture} alt="User profile picture" className='rounded-full h-6 w-6' />
              <span className='pl-1 pr-5 hover:underline cursor-pointer truncate max-w-[150px]'>
                {request.name} {request.surname}
              </span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <button onClick={() => handleRequest(request.id)} title="Accept the request">
                <img src={Accept} alt="Accept" className='w-5 h-5'/>   
              </button>
              <button onClick={() => handleRequest(request.id)} title="Reject the request">
                <img src={Reject} alt="Reject" className='w-5 h-5'/>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-[#4f3726] p-2 mt-2">No edit requests</p>
      )}

      <span className='h-[0.1px] bg-[#4f37267b] w-full my-2'></span>
    </div>
  );
};

export default EditRequests;
