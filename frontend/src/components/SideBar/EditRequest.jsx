import React, { useState } from 'react'

const EditRequest = () => {
    const [editRequest, setEditREquest] = useState('noRequest')
    const [waitingMessage, setWaitingMessage] = useState(false)

  return (
    <>
        { editRequest === 'noRequest' ? (
            <div className='text-xs flex flex-col items-center gap-2'>
                { !waitingMessage ?(
                    <>
                        <div className='mt-3 mx-4 mb-2 text-center'>Do you want to send an editing request to the owner of the project?</div>
                        <button className='w-20 shadow-sm rounded-full bg-[#4F3726] text-[#FFF8E3] h-6 mb-3' onClick={() => setWaitingMessage(true)}>Confirm</button>
                    </>
                ) : (
                    <div className='text-xs my-3 mx-4 text-center'>Your editting request has been sent.</div>
                )}
            </div>
        ) : editRequest === 'accepted'? (
            <div className='text-xs flex flex-col items-center gap-2'>
                <div className='mt-3 mx-4 mb-2 text-center'>Your editting request has been accepted!</div>
                <button className='w-28 shadow-sm rounded-full bg-[#4F3726] text-[#FFF8E3] h-6 mb-3'>Start editting</button>
            </div>
        ) : (
            <div className='text-xs my-3 mx-4 text-center'>Your editting request has been declined.</div>
        )}
         <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
    </>
  )
}

export default EditRequest