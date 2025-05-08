import React from 'react'
import {Undo2 ,Redo2 ,Copy ,Clipboard ,ChevronDown ,Bold ,Italic ,Underline ,StrikethroughIcon ,List ,ListOrdered ,Link ,EllipsisVertical ,
ChevronUp ,AlignCenter ,AlignLeft ,AlignRight ,AlignJustify ,Plus ,Image ,Video ,Grid2X2 ,Play , MoveUpLeft ,X ,FilePenLine} from 'lucide-react'
import * as LucideIcons from "lucide-react";
import { useState, useRef, useEffect } from 'react';
import menuBar from '../assets/images/menu-bar.svg'
import backgroundChanger from '../assets/images/backgroundChanger.svg'
import bookmark from '../assets/images/bookmark.svg'
import { TwitterPicker } from "react-color";
import {HexColorPicker} from 'react-colorful'
import TableGridSelector from './TableGridSelector.jsx'
import useCurrentUser from '../utils/useCurrentUser.js';
// () Don't forget keyboard shortcuts for toolbar functionalities ) <= a message for myself

export default function EditorToolbar({ editor, onSelectCoverPicture, savedProject, user }) {
  const [textColor, setTextColor] = useState("#212529");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [showPickerText, setShowPickerText] = useState(false);
  const [showPickerBackground, setShowPickerBackground] = useState(false);
  const [showFont, setFont]=useState(false);
  const [selectedFont, setSelectedFont]=useState("Times New Roman");
  const [showAlign, setAlign]= useState(false);
  const [selectedAlign, setSelectedAlign]= useState("AlignLeft");
  const [showSize, setSize]=useState(false);
  const [selectedSize, setSelectedSize]=useState("18");
  const [showInsert, setInsert]=useState(false);
  const IconComponent = LucideIcons[selectedAlign];
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [showOptions, setShowOptions]=useState(false);
  const [row, setRow]=useState(1);
  const [col, setCol]=useState(1);
  const [display, setDisplay]= useState(true);


  const dropdownRefs = useRef({
    text: null,
    background: null,
    font: null,
    align: null,
    size:null,
    insert:null,
    options:null,
  });
  const fileInputRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      Object.entries(dropdownRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) {
          switch (key) {
            case "text":
              setShowPickerText(false);
              break;
            case "background":
              setShowPickerBackground(false);
              break;
            case "font":
              setFont(false);
              break;
            case "align":
              setAlign(false);
              break;
            case "size":
              setSize(false);
              break;
            case "insert":
              setInsert(false);
              break;
            case "options":
              setShowOptions(false);
              break;
            default:
              break;
          }
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleColorPickerText=()=>{
    setShowPickerText((prev) => !prev);
  };
  const handleColorPickerBackground=()=>{
    setShowPickerBackground((prev) => !prev);
  };
  const handleSelectFont = (value) => {
    setSelectedFont(value);
    setFont(false);
    if (editor) {
      editor.chain().focus().setFontFamily(value).run()
    }
  };
  const handleSelectAlign = (value) => {
    setSelectedAlign(value);
    setAlign(false);
  }
  const handleSelectedSize = (value) => {
    setSelectedSize(value);
    setSize(false);
  }
  useEffect(() => {
    if (!editor) return;
    const updateButtons = () => {
      setCanUndo(editor.can().undo()); // takes true or false, true => undo possible / false => not possible
      setCanRedo(editor.can().redo());
    };
    editor.on('transaction', updateButtons); // whenever anything changes in the editor this callback runs making undo and redo clickable
    updateButtons(); 
    return () => {
      editor.off('transaction', updateButtons);
    };
  }, [editor]);

  const handleCopy = () => {
    const html = editor.getHTML(); // get the full editor content as HTML
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      // If user selected some text, just copy the selected text
      navigator.clipboard.writeText(selection.toString());
    } else {
      //copies the whole text if nothing is selected
      navigator.clipboard.writeText(editor.getText());
    }
  };
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    editor.commands.insertContent(text); // Inserts plain text at the cursor
  };  
  const handleCoverPicture = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onSelectCoverPicture ) {
      onSelectCoverPicture(file); 
    }
  };
  const addImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
  
    fileInput.onchange = (event) => {
      const file = event.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result;
  
          editor.chain().focus().setImage({ 
            src: imageUrl,
            width: 200,   // Optional: initial width
            height: 200,  // Optional: initial height
          }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }; 

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      })
    }
  }

  const addReferenceBlock = () => {
    editor?.chain().focus().insertContent({
      type: 'referenceBlock',
      attrs: { reference: '' },
    }).run()
  }

  const addLinkBlock = () => {
    editor?.chain().focus().insertContent({
      type: 'linkBlock',
    }).run()
  }

  useEffect(()=> {
    if(!savedProject.title){
      setDisplay(true);
    }
    else{
      if((savedProject.author?._id === user?._id) && (savedProject && user)){
        setDisplay(true);
      }
      else {
        setDisplay(false);
      }
    }
  }
)
  
  if (!editor) return null;
  return (
    <>
      <div className='flex items-center font-montserral gap-3 shadow-md bg-white/80 py-3 px-2 w-fit'>
        <div className='flex'>
           <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='undo' onClick={() => editor.chain().focus().undo().run()}
            disabled={!canUndo}>
            <Undo2 />
           </button>
           <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='redo' onClick={() => editor.chain().focus().redo().run()}
            disabled={!canRedo}>
            <Redo2 />
           </button>
           <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='copy' onClick={handleCopy}>
            <Copy />
           </button>
           <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='paste' onClick={handlePaste}>
            <Clipboard />
           </button>
        </div>
        {/* THE INSERT LIST  */}
        <div className='font-medium flex relative' ref={(el) => (dropdownRefs.current.insert = el)}>
          <p onClick={() => setInsert(!showInsert)} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md cursor-pointer
          ${showInsert && 'bg-[#4F3726] bg-opacity-20'}`} >insert <Plus/>
          </p>
          {showInsert && ( <ul className="absolute left-0 top-10 w-36 bg-white rounded shadow-lg">
          {["Image", "Video", "Grid2X2"].map((value) => {
            const Icon=LucideIcons[value];
            const LabelInsert={
              Image: "image",
              Video: "video",
              Grid2X2: "table",
            }
            return <li key={value} className={`flex group items-center gap-2 p-2 cursor-pointer hover:bg-[#4F3726] hover:bg-opacity-20 text-center relative`}
            onClick={() => {setInsert(false)
              if(value=='Image'){addImage()}
              if(value=='Grid2X2'){editor?.commands.insertTable({ rows: row, cols: col })}
              if(value=='Video'){addYoutubeVideo()}
            }}>
            <Icon/> {LabelInsert[value]} {(value=="Grid2X2") && <Play size={8} className='ml-auto'/>}
            {value=="Grid2X2" && ( <div className='absolute left-36 top-0 z-10 hidden group-hover:block'> <TableGridSelector setRow={setRow} setCol={setCol}/></div>)}
             </li>})}
          </ul>)}
        </div>

        <div className='flex relative' ref={(el) => (dropdownRefs.current.font = el)}>
          <p onClick={() => setFont(!showFont)} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md cursor-pointer
          ${showFont && 'bg-[#4F3726] bg-opacity-20'}`} style={{ fontFamily: selectedFont }}>{selectedFont}
          {showFont ? <ChevronUp/> : <ChevronDown/> }
          </p>
          {showFont && ( <ul className="absolute left-0 top-10 w-48 bg-white rounded shadow-lg overflow-y-auto h-40" >
          {["Times New Roman", "Roboto", "Arial", "Helvetica Neue", "Georgia", "Courier new" ,"Futura", "Avenir"].map((value) => 
          (<li key={value} className={`p-2 cursor-pointer hover:bg-[#4F3726] hover:bg-opacity-20 ${editor.isActive('textStyle', { fontFamily: value })
            ? 'is-active' : ''}`} style={{ fontFamily: value }} onClick={() => handleSelectFont(value)}> {value} </li> ))}
          </ul>)}
        </div>
        <div className='flex relative' ref={(el) => (dropdownRefs.current.align = el)}>
          <div onClick={() => setAlign((prev) => !prev)} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md cursor-pointer
          ${showAlign && 'bg-[#4F3726] bg-opacity-20'}`}><IconComponent />
          {showAlign ? <ChevronUp/> : <ChevronDown/> }
          </div>
          {showAlign && ( <ul className="absolute left-0 top-10 w-30 bg-white rounded shadow-lg">
          {["AlignLeft" , "AlignRight" , "AlignCenter" , "AlignJustify"].map((value) => {
             const Icon = LucideIcons[value];
             const labelMap = {
              AlignLeft: "left",
              AlignRight: "right",
              AlignCenter: "center",
              AlignJustify: "justify",
            };
            return <li key={value} className={`flex gap-1 p-2 cursor-pointer hover:bg-[#4F3726] hover:bg-opacity-20 `}
            onClick={()=>{handleSelectAlign(value)
              editor.chain().focus().setTextAlign(labelMap[value]).run()
            }}> <Icon/> {labelMap[value]}</li>; })}
            </ul>)} 
            </div>
        <button className='flex relative' ref={(el) => (dropdownRefs.current.size = el)}>
          <p onClick={() => setSize(!showSize)} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md cursor-pointer
          ${showSize && 'bg-[#4F3726] bg-opacity-20'}`} style={{ fontFamily: selectedSize }}>{selectedSize}
          {showSize ? <ChevronUp/> : <ChevronDown/> }
          </p>
          {showSize && ( <ul className="absolute left-0 top-10 w-14 h-40 overflow-y-auto bg-white rounded shadow-lg">
          {["8","10","12","14","16","18","20","24","28","32","36"].map((value) => 
          (<li key={value} className={`p-2 cursor-pointer hover:bg-[#4F3726] hover:bg-opacity-20 text-center`}
          onClick={() => {handleSelectedSize(value)
          editor.chain().focus().setFontSize(value).run() }}> {value} </li> ))}
          </ul>)}
        </button>
        <div className='flex'>
            <button onClick={handleColorPickerText} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md relative'
            ${showPickerText && 'bg-[#4F3726] bg-opacity-20'}`}title='change text color'>
                <div className={`p-3 rounded-md ${showPickerText && 'bg-[#FFFFFF]'}`} style={{backgroundColor:textColor}}></div>
                {showPickerText ? <ChevronUp/> : <ChevronDown/>}
            </button>
            <button onClick={handleColorPickerBackground} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md relative
            ${showPickerBackground && 'bg-[#4F3726] bg-opacity-20'}`}title='highlight text'>
                <img src={backgroundChanger} alt="change-background" />
                {showPickerBackground ? <ChevronUp/> : <ChevronDown/>}
            </button>
            {showPickerText && ( <div className="absolute top-14 left-50 z-10 shadow-lg" ref={(el) => (dropdownRefs.current.text = el)} >
               <TwitterPicker color={textColor} onChangeComplete={(c) =>{ setTextColor(c.hex)
                editor.chain().focus().setColor(c.hex).run()
               }} colors={[ "#212529", "#7950F2", "#339AF0", "#22B8CF",
                "#40C057", "#FCC419", "#FA5252", "#E64980", "#CED4DA", "#5F3DC4", "#1864AB","#0B7285", "#2B8A3E" ,"#E67700" ,"#C92A2A", "#A61E4D"]}
                width="330px"/>
               </div>
            )}
            {showPickerBackground && ( <div className="absolute top-14 left-50 ml-16 z-10 " ref={(el) => (dropdownRefs.current.background = el)}
              >
               {<TwitterPicker color={backgroundColor} onChangeComplete={(c) => {setBackgroundColor(c.hex)
               editor.chain().focus().setCustomHighlight(c.hex).run()}} colors={[ "#212529", "#7950F2", "#339AF0", "#22B8CF",
                "#40C057", "#FCC419", "#FA5252", "#E64980", "transparent", "#5F3DC4", "#1864AB","#0B7285", "#2B8A3E" ,"#E67700" ,"#C92A2A", "#A61E4D"]}
                width="330px"/>}
                {/* <div className='bg-white px-6 rounded-md drop-shadow-md py-2'>
                  <HexColorPicker onChange={(c)=>editor.chain().focus().setCustomHighlight(c).run()}/>
                  <button className='text-sm flex items-center bg-gray-500 bg-opacity-10 mt-2'>No color<X/></button>
                </div> */}
                
               </div>
            )}
        </div>
        <div className='flex'>
            <button className={`hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5`} title='set text to bold'
             onClick={() =>{ editor.chain().focus().toggleBold().run()}}> {/* these are tiptap commands for formatting text */}
                <Bold/>
            </button>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='set text to italic' 
            onClick={() => editor.chain().focus().toggleItalic().run()}>
                <Italic/>
            </button>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='underline text'
            onClick={() => editor.chain().focus().toggleUnderline().run()}>
                <Underline/>
            </button>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='strikethrough text'
            onClick={() => editor.chain().focus().toggleStrike().run()}>
                <StrikethroughIcon/>
            </button>
        </div>
        <div className='flex'>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='normal list'
            onClick={()=> editor.chain().focus().toggleBulletList().run()}>
                <List/>
            </button>
            <button className={`hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5 ${editor.isActive('orderedList') ? 'active' : ''}`} title='ordered list'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                <ListOrdered/>
            </button>
        </div>
        <div className='flex'>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='attach a link' onClick={addLinkBlock} >
                <Link/>
            </button>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5' title='attach a reference' onClick={addReferenceBlock}>
                <img src={bookmark} alt="bookmark" className='w-5 h-5' />
            </button>
        </div>
        <div className='relative' ref={(el) => (dropdownRefs.current.options = el)}>
          <button title='options' onClick={()=>setShowOptions(!showOptions)}>
            <EllipsisVertical/> {/*clear content ? edit cover ? */}
        </button>
        {showOptions && ( <ul className="absolute right-0 top-10 w-48 overflow-y-auto bg-white rounded shadow-lg">
          {display && (<div>
            <li className={`p-2 cursor-pointer hover:bg-[#4F3726] hover:bg-opacity-20 flex gap-2 items-center justify-center`}
            onClick={handleCoverPicture}><FilePenLine/> edit cover picture </li> 
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
          </div>) }
          <li className='p-2 cursor-pointer hover:bg-[#4F3726] hover:bg-opacity-20 flex gap-2 items-center justify-center'><X/> clear content</li>
          </ul>)}
        </div>
      </div>
    </>
  )
} 
