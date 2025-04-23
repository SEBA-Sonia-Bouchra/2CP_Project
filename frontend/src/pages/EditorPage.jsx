import React, {useState} from 'react'
import EditorToolbar from '../components/EditorToolbar'
import EditProject from '../components/EditProject'

export default function EditorPage() {
  const [activeEditor, setActiveEditor] = useState(null); 
  return (
    <>
      <div className='fixed top-0 left-16 z-50 bg-white'>
        <EditorToolbar editor={activeEditor}/>
      </div>  
      <div className='mt-20'>
        <EditProject onEditorFocus={setActiveEditor}/>
      </div>
    </>
  )
}