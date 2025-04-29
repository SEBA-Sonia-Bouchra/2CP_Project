import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Options = ({ isOwner, project }) => {
  const handlePdfDownload = async () =>{
    try{
      const response = await fetch(`http://localhost:5000/api/download/${project._id}/pdf`,{
        method: 'GET',
      });
      if (!response.ok){
        throw new Error('Failed to download pdf');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.log('Error downloading pdf:', error);
    }
  }

  const handleHtmlDownload = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/download/${project._id}/html`);
      const htmlContent = await response.text(); // get the HTML text
  
      const blob = new Blob([htmlContent], { type: 'text/html' }); // create a blob of type HTML
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project._id}.html`; // filename
      document.body.appendChild(a);
      a.click();
      a.remove();
  
      window.URL.revokeObjectURL(url); // free memory
    } catch (error) {
      console.error('Error downloading HTML:', error);
    }
  };
  
    // Trigger Google OAuth login
    const handleGoogleLogin = () => {
      // Save the current page before going to Google login
      const currentPath = window.location.pathname;
      window.location.href = `http://localhost:5000/auth/google?state=${encodeURIComponent(currentPath)}`;
    };
    
    const handleSaveDrive = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('No access token found');
        return;
      }
    
      const fileType = 'pdf'; 
    
      try {
        const { data } = await axios.post(`http://localhost:5000/api/download/${project._id}/${fileType}`, {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // if your server expects token
          }
        });
    
        if (data.publicUrl) {
          console.log('File uploaded successfully:', data.publicUrl);
        } else {
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('Upload failed', error);
      }
    };    

  return (
    <div className='flex flex-col items-center w-[232px] lg:w-[300px]'>
      {isOwner && (
        <>
          <span className='h-[0.1px] bg-[rgba(79,55,38,0.48)] w-full'></span>
          <Link to={"/editor"} className='py-2'>
            <span className='text-[#4F3726] text-sm cursor-pointer'>Edit Project</span>
          </Link>
        </>
      )}
      <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
      <span className='text-[#4F3726] py-2 text-sm cursor-pointer'
            onClick={handlePdfDownload}
            >
        Download as .pdf
      </span>
      <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
      <span className='text-[#4F3726] py-2 text-sm cursor-pointer'
            onClick={handleHtmlDownload}>
              Download as .html
      </span>
      <span className='h-[0.1px] bg-[rgba(79,55,38,0.48)] w-full'></span>
      <span className='text-[#4F3726] py-2 text-sm cursor-pointer'
            onClick={handleSaveDrive}>
        Save to Drive
      </span>
      <span 
        className="text-[#4F3726] py-2 text-sm cursor-pointer"
        onClick={handleGoogleLogin}>
        Login with Google
      </span>
      <span className='h-[0.1px] bg-[rgba(79,55,38,0.48)] w-full'></span>

    </div>
  );
};

export default Options;
