import React, {useState, useEffect} from 'react'
import EditorToolbar from '../components/EditorToolbar'
import EditProject from '../components/EditProject'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function EditorPage() {
  const [activeEditor, setActiveEditor] = useState(null); 
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [projectData, setProjectData] = useState(null)
  const { id } = useParams() // gets the current page url 
  useEffect(() => {
    if (id) { // get the project with the matching id 
      axios.get(`http://localhost:5000/api/projects/${id}`).then((res) => {
          setProjectData(res.data)
        })
        .catch((err) => {
          console.error('Failed to load project:', err)
        })
    } else {
      // new project
      setProjectData({
        title: '',
        sections: [],
      })
    }
  }, [id])
  if (!projectData) return <div className='font-montserral'>Loading...</div>
  return (
    <>
    <div className='flex justify-center'>
      <div className='fixed top-0 z-50 bg-white'>
        <EditorToolbar editor={activeEditor} onSelectCoverPicture={setCoverImageFile}/> {/*So the toolbar can control the currently focused editor*/}
      </div> 
    </div> 
      <div className='mt-20'>
        <EditProject onEditorFocus={setActiveEditor} coverImageFile={coverImageFile} savedProject={projectData}/> {/*updates activeEditor with the focused editor in editproject*/}
      </div>
    </>
  )
}