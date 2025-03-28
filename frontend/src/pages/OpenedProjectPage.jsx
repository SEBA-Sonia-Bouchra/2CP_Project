import React from 'react'
import ProjectSideBar from '../components/ProjectSideBar'
import File from '../components/File'

const OpenedProjectPage = () => {
  return (
      <div className='pt-12 flex flex-row gap-[1%] justify-center bg-[#FFFFF1] w-full min-h-screen'>
        <File />
        <ProjectSideBar />
    </div>
  )
}

export default OpenedProjectPage