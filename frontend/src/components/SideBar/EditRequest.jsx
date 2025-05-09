import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const EditRequest = ({ projectId }) => {
  const [editRequest, setEditRequest] = useState('noRequest');
  const [waitingMessage, setWaitingMessage] = useState(false);
  const [error, setError] = useState('');
  const localhost = "http://localhost:5000";

  const sendEditRequest = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${localhost}/api/editrequests/${projectId}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        }
    });

    const data = await response.json();

    if (response.ok) {
        setWaitingMessage(true);
        setError('');
    } else {
        setError(data.message || 'Failed to send request.');
    }
    } catch (err) {
        console.error('Request failed:', err);
        setError('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;
  
    const fetchRequestStatus = async () => {
      try {
        const res = await fetch(`${localhost}/api/editrequests/project/${projectId}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const data = await res.json();
        setEditRequest(data.status);
      } catch (err) {
        console.error('Failed to fetch request status:', err);
      }
    };
  
    fetchRequestStatus();
  
    // Poll every 10 seconds to check for updates
    const intervalId = setInterval(fetchRequestStatus, 10000);
  
    return () => clearInterval(intervalId);
  }, [projectId]);  

    // const handleSendRequest = async () => {
    //     try {
    //         setWaitingMessage(true);
    //         const response = await axios.post(`/api/edit-requests/${projectId}`);
    //         if (response.status === 200) {
    //            console.log("✅ Request sent:", response.data);
    //         }
    //     } catch (err) {
    //         console.error('❌ Failed to send edit request:', err);
    //         setWaitingMessage(false);
    //         if (err.response?.data?.message) {
    //             setError(err.response.data.message);
    //         } else {
    //             setError("An error occurred while sending your request.");
    //         }
    //     }
    // };
  return (
    <>
      {(editRequest === 'noRequest' ) ? (
        <div className='text-xs flex flex-col items-center gap-2 w-[232px] lg:w-[300px]'>
          {!waitingMessage ? (
            <>
              <div className='mt-3 mx-4 mb-2 text-center'>
                Do you want to send an editing request to the owner of the project?
              </div>
              <button
                className='w-20 shadow-sm rounded-full bg-[#4F3726] text-[#FFF8E3] h-6 mb-3'
                onClick={sendEditRequest}
              >
                Confirm
              </button>
              {error && <p className='text-red-500 text-center text-[10px]'>{error}</p>}
            </>
          ) : (
            <div className='text-xs my-3 mx-4 text-center'>Your editing request has been sent.</div>
          )}
        </div>
      ) : editRequest === 'accepted' ? (
        <div className='text-xs flex flex-col items-center gap-2 sm:max-w-[232px] lg:max-w-[300px]'>
          <div className='mt-3 mx-4 mb-2 text-center'>Your editing request has been accepted!</div>
          <Link to={`/projects/${projectId}/edit`}>
            <button className='w-28 shadow-sm rounded-full bg-[#4F3726] text-[#FFF8E3] h-6 mb-3'>Start editing</button>
          </Link>
        </div>
      ) : editRequest === 'rejected' ? (
        <div className='text-xs my-3 mx-4 text-center max-w-[300px]'>Your editing request has been declined.</div>
      ): (
        <div className='text-xs my-3 mx-4 text-center'>Your editing request has been sent.</div>
      )}
      <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
    </>
  );
};

export default EditRequest;
