import React from 'react'
import {Undo2 ,Redo2 ,Copy ,Clipboard ,ChevronDown ,Bold ,Italic ,Underline ,StrikethroughIcon ,List ,ListOrdered ,Link ,EllipsisVertical ,
  ChevronUp ,AlignCenter ,AlignLeft ,AlignRight ,AlignJustify ,Plus ,Image ,Video ,Grid2X2 ,Triangle ,Play ,Square ,Circle ,MoveUpLeft} from 'lucide-react'
    import * as LucideIcons from "lucide-react";
import { useState, useRef, useEffect } from 'react';
import menuBar from '../assets/images/menu-bar.svg'
import backgroundChanger from '../assets/images/backgroundChanger.svg'
import bookmark from '../assets/images/bookmark.svg'
import line from '../assets/images/line.svg'
import { TwitterPicker } from "react-color";
import TableGridSelector from './TableGridSelector.jsx'

export default function EditorToolbar() {
  const [textColor, setTextColor] = useState("#212529");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [showPickerText, setShowPickerText] = useState(false);
  const [showPickerBackground, setShowPickerBackground] = useState(false);
  const [showZoom, setZoom] = useState(false);
  const [showFont, setFont]=useState(false);
  const [selectedZoom, setSelectedZoom] = useState("100%");
  const [selectedFont, setSelectedFont]=useState("Times New Roman");
  const [showAlign, setAlign]= useState(false);
  const [selectedAlign, setSelectedAlign]= useState("AlignLeft");
  const [showSize, setSize]=useState(false);
  const [selectedSize, setSelectedSize]=useState("14");
  const [showInsert, setInsert]=useState(false);
  const IconComponent = LucideIcons[selectedAlign];

  const dropdownRefs = useRef({
    text: null,
    background: null,
    zoom: null,
    font: null,
    align: null,
    size:null,
    insert:null,
  });

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
            case "zoom":
              setZoom(false);
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
  const handleSelectZoom = (value) => {
    setSelectedZoom(value);
    setZoom(false);
  };
  const handleSelectFont = (value) => {
    setSelectedFont(value);
    setFont(false);
  };
  const handleSelectAlign = (value) => {
    setSelectedAlign(value);
    setAlign(false);
  }
  const handleSelectedSize = (value) => {
    setSelectedSize(value);
    setSize(false);
  }
  return (
    <>
      <div className='flex items-center font-montserral gap-3 shadow-md opacity-80 py-3 px-2 w-fit'>
        <div className='flex'>
           <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
            <Undo2 />
           </button>
           <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
            <Redo2 />
           </button>
           <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
            <Copy />
           </button>
           <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
            <Clipboard />
           </button>
        </div>
        <div className='font-medium flex relative' ref={(el) => (dropdownRefs.current.insert = el)}>
          <p onClick={() => setInsert(!showInsert)} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md cursor-pointer
          ${showInsert && 'bg-[#4F3726] bg-opacity-20'}`} >insert <Plus/>
          </p>
          {showInsert && ( <ul className="absolute left-0 top-10 w-36 bg-white rounded shadow-lg">
          {["Image", "Video", "Grid2X2", "Triangle"].map((value) => {
            const Icon=LucideIcons[value];
            const LabelInsert={
              Image: "image",
              Video: "video",
              Grid2X2: "table",
              Triangle: "shape",
            }
            return <li key={value} className={`flex group items-center gap-2 p-2 cursor-pointer hover:bg-[#4F3726] hover:bg-opacity-20 text-center relative`}
            onClick={() => {setInsert(false)}}>
            <Icon/> {LabelInsert[value]} {(value=="Grid2X2" || value=="Triangle") && <Play size={8} className='ml-auto'/>}
            {value=="Grid2X2" && ( <div className='absolute left-36 top-0 z-10 hidden group-hover:block'> <TableGridSelector/></div>)}
            {value=="Triangle" && ( <ul className='absolute left-36 top-0 z-10 hidden group-hover:block w-36 text-lg'>
              <li className='flex gap-1 hover:bg-[#4F3726] hover:bg-opacity-20 px-2 items-center'><Square/> Rectangle</li>
              <li className='flex gap-1 hover:bg-[#4F3726] hover:bg-opacity-20 px-2 items-center'><Circle/> Circle</li>
              <li className='flex gap-1 hover:bg-[#4F3726] hover:bg-opacity-20 px-2 items-center'><Triangle/> Triangle</li>
              <li className='flex gap-1 hover:bg-[#4F3726] hover:bg-opacity-20 px-2 items-center'><img src={line} className='w-6 h-6'/>Line</li>
              <li className='flex gap-1 hover:bg-[#4F3726] hover:bg-opacity-20 px-2 items-center'><MoveUpLeft/> Arrow</li>
            </ul>)} </li>})}
          </ul>)}
        </div>
        <button>
            import
        </button>
        <div className='flex relative' ref={(el) => (dropdownRefs.current.zoom = el)}>
          <p onClick={() => setZoom(!showZoom)} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md cursor-pointer
          ${showZoom && 'bg-[#4F3726] bg-opacity-20'}`}>{selectedZoom}
          {showZoom ? <ChevronUp/> : <ChevronDown/> }
          </p>
          {showZoom && ( <ul className="absolute left-0 top-10 w-20 bg-white rounded shadow-lg">
            {["50%", "75%", "100%", "125%", "150%"].map((value) => (<li key={value} className="p-2 cursor-pointer hover:bg-[#4F3726] hover:bg-opacity-20
          text-center" onClick={() => handleSelectZoom(value)}> {value} </li>))}
        </ul>)}
        </div>
        <div className='flex relative' ref={(el) => (dropdownRefs.current.font = el)}>
          <p onClick={() => setFont(!showFont)} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md cursor-pointer
          ${showFont && 'bg-[#4F3726] bg-opacity-20'}`} style={{ fontFamily: selectedFont }}>{selectedFont}
          {showFont ? <ChevronUp/> : <ChevronDown/> }
          </p>
          {showFont && ( <ul className="absolute left-0 top-10 w-48 bg-white rounded shadow-lg overflow-y-auto h-40">
          {["Times New Roman", "Roboto", "Arial", "Helvetica Neue", "Georgia", "Courier new" ,"Futura", "Avenir"].map((value) => 
          (<li key={value} className={`p-2 cursor-pointer hover:bg-[#4F3726] hover:bg-opacity-20`} style={{ fontFamily: value }}
          onClick={() => handleSelectFont(value)}> {value} </li> ))}
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
            onClick={()=>handleSelectAlign(value)}> <Icon/> {labelMap[value]}</li>; })}
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
          onClick={() => handleSelectedSize(value)}> {value} </li> ))}
          </ul>)}
        </button>
        <div className='flex'>
            <button onClick={handleColorPickerText} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md relative'
            ${showPickerText && 'bg-[#4F3726] bg-opacity-20'}`}>
                <div className={`p-3 rounded-md ${showPickerText && 'bg-[#FFFFFF]'}`} style={{backgroundColor:textColor}}></div>
                {showPickerText ? <ChevronUp/> : <ChevronDown/>}
            </button>
            <button onClick={handleColorPickerBackground} className={`flex hover:bg-[#4F3726] hover:bg-opacity-20 py-2 px-2 rounded-md relative
            ${showPickerBackground && 'bg-[#4F3726] bg-opacity-20'}`}>
                <img src={backgroundChanger} alt="change-background" />
                {showPickerBackground ? <ChevronUp/> : <ChevronDown/>}
            </button>
            {showPickerText && ( <div className="absolute top-14 left-50 z-10 shadow-lg" ref={(el) => (dropdownRefs.current.text = el)}>
               <TwitterPicker color={textColor} onChangeComplete={(c) => setTextColor(c.hex)} colors={[ "#212529", "#7950F2", "#339AF0", "#22B8CF",
                "#40C057", "#FCC419", "#FA5252", "#E64980", "#CED4DA", "#5F3DC4", "#1864AB","#0B7285", "#2B8A3E" ,"#E67700" ,"#C92A2A", "#A61E4D"]}
                width="330px"/>
               </div>
            )}
            {showPickerBackground && ( <div className="absolute top-14 left-50 ml-16 z-10 shadow-lg" ref={(el) => (dropdownRefs.current.background = el)}>
               <TwitterPicker color={backgroundColor} onChangeComplete={(c) => setBackgroundColor(c.hex)} colors={[ "#212529", "#7950F2", "#339AF0", "#22B8CF",
                "#40C057", "#FCC419", "#FA5252", "#E64980", "#CED4DA", "#5F3DC4", "#1864AB","#0B7285", "#2B8A3E" ,"#E67700" ,"#C92A2A", "#A61E4D"]}
                width="330px"/>
               </div>
            )}
        </div>
        <div className='flex'>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
                <Bold/>
            </button>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
                <Italic/>
            </button>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
                <Underline/>
            </button>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
                <StrikethroughIcon/>
            </button>
        </div>
        <div className='flex'>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
                <List/>
            </button>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
                <ListOrdered/>
            </button>
        </div>
        <div className='flex'>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
                <Link/>
            </button>
            <button className='hover:bg-[#4F3726] hover:bg-opacity-20 rounded-md p-1.5'>
                <img src={bookmark} alt="bookmark" className='w-5 h-5' />
            </button>
        </div>
        <button>
            <EllipsisVertical/> {/*clear content ? edit cover ? change section color ?*/}
        </button>
      </div>
    </>
  )
}
