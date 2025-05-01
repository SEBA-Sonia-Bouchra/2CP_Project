import React, {useState} from 'react'
import EditorToolbar from '../components/EditorToolbar'
import EditProject from '../components/EditProject'

export default function EditorPage() {
  const [activeEditor, setActiveEditor] = useState(null); 
  const [coverImageFile, setCoverImageFile] = useState(null);
  return (
    <>
    <div className='flex justify-center'>
      <div className='fixed top-0 z-50 bg-white'>
        <EditorToolbar editor={activeEditor} onSelectCoverPicture={setCoverImageFile}/> {/*So the toolbar can control the currently focused editor*/}
      </div> 
    </div> 
      <div className='mt-20'>
        <EditProject onEditorFocus={setActiveEditor} coverImageFile={coverImageFile}/> {/*updates activeEditor with the focused editor in editproject*/}
      </div>
    </>
  )
}