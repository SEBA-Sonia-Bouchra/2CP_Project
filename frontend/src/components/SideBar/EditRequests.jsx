import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accept from '../../assets/images/Accept.svg';
import Reject from '../../assets/images/Reject.svg';

const EditRequests = ({ projectId }) => {
  const [editRequests, setEditRequests] = useState([]);
  const localhost = "http://localhost:5000";

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${localhost}/api/editrequests/project/${projectId}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }}
        );
        setEditRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch edit requests", err);
      }
    };

    fetchRequests();
  }, [projectId]);

  const handleRequest = async (id, action) => {
    try{
      const token = localStorage.getItem('token');
      await axios.patch(`${localhost}/api/approveeditreqest/${id}`,
        {action},
        {headers: {Authorization: `Bearer ${token}`}}
      );
      setEditRequests(editRequests.filter(request => request._id !== id));
      alert(`Edit request ${action}ed!`);
    }catch(err){
      console.log(`Failed to ${action} request `, err);
    }
  };

  return (
    <div className='flex flex-col text-xs w-[232px] lg:w-[300px]'>
      <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>

      {editRequests.length > 0 ? (
        editRequests.map((request) => (
          <div key={request._id} className='pt-2 px-2 flex flex-row justify-between'>
            <div className='flex flex-row items-center'>
              <img src={`${localhost}${request.requester.profilePicture} ` || edit} 
              alt="User profile" className='rounded-full h-6 w-6 object-cover object-center' />
              <span className='pl-1 pr-5 hover:underline cursor-pointer truncate max-w-[150px]'>
                {request.requester.firstname} {request.requester.lastname}
              </span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <button onClick={() => handleRequest(request._id, 'accept')} title="Accept the request">
                <img src={Accept} alt="Accept" className='w-5 h-5'/>   
              </button>
              <button onClick={() => handleRequest(request._id, 'reject')} title="Reject the request">
                <img src={Reject} alt="Reject" className='w-5 h-5'/>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-[#4f3726] p-2 mt-2">No edit requests</p>
      )}

      <span className='h-[0.1px] bg-[#4f37267b] w-full mt-2'></span>
    </div>
  );
};

export default EditRequests;
