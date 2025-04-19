import React from 'react';

const ReportConflict = ({ setReportConflict, annotation, isOwner }) => {
  return (
    <div className='fixed left-0 top-0 w-full flex items-center justify-center h-screen bg-black bg-opacity-25 z-30'>
      <div className='bg-white rounded-md lg:w-1/2 max-w-lg p-4'>
        <h3 className='text-center mb-6 text-lg font-medium'>Conflict Resolution</h3>

        <div className='text-sm mb-6 px-2'>
          <p className='mb-2'>Send an email to:</p>
          <div className='grid grid-cols-[auto_1fr_auto] gap-2 items-center'>
            {isOwner && (
              <>
                <img src={annotation.section.profilePicture} alt="User Profile" className='rounded-full h-6 w-6' />
                <p className='hover:underline truncate max-w-[200px] whitespace-nowrap'>
                  {annotation.section.name} {annotation.section.surname}
                </p>
                <span className='text-left text-xs text-gray-600'>Section Writer</span>
              </>
            )}
            <img src={annotation.profilePicture} alt="User Profile" className='rounded-full h-6 w-6' />
            <p className='hover:underline truncate max-w-[200px] whitespace-nowrap'>
              {annotation.name} {annotation.surname}
            </p>
            <span className='text-left text-xs text-gray-600'>Annotation Writer</span>
          </div>
        </div>

        <div className='flex justify-center gap-3'>
          <button
            className='border-[#4F3726] border text-[#4F3726] px-5 py-2 rounded-full text-sm hover:bg-gray-50 shadow-sm'
            onClick={() => setReportConflict(false)}
          >
            Cancel
          </button>
          <button
            className='bg-[#4F3726] text-white px-5 py-2 rounded-full text-sm shadow-md'
            onClick={() => setReportConflict(false)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportConflict;
