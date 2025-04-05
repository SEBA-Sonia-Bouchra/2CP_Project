import React from 'react'
import ProjectSideBar from '../components/ProjectSideBar'
import File from '../components/File'
import bg from '../assets/images/background.png'
import vid from '../assets/Videos/vid.mp4'


const Projects = [
  {
    _id: '1',
    title: {
      content: 'Timeless Elegance: The Architecture of Algiers',
      styles: { fontFamily: 'PlayfairDisplay' , fontSize: '20px' },
    },
    description: {
      content: 'Exploring the blend of Moorish, Ottoman, and modernist architectural styles in Algiers.',
      styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
    },
    author: { 
      name: 'Dahmane Lharachi',
      id: '660f12ab34cd56ef78901234',
      profilePicture: bg
     },
    dateOfPublish: '2025-02-03T00:00:00Z',
    coverPhoto: bg, 
    sections: [
      {
        id: 'sec1',
        dimension: 'architecture',
        author: {
          name: 'John Doe',
          profilePicture: bg
        },
        elements: [
          {
            type: 'text',
            content: 'Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings. Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings [1]',
            position: { rowStart: 1, colStart: 1, colSpan: 2, rowSpan: 1 },
            styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
          },
          {
            type: 'image',
            content: bg,
            position: { rowStart: 1, colStart: 3, colSpan: 1, rowSpan: 2 },
          }
        ]
      },
      {
        id: 'sec2',
        dimension: 'history',
        author: {
          name: 'John Doe',
          profilePicture: bg
        },
        elements: [
          {
            type: 'text',
            content: 'This video explores the historical evolution of Algiers\' architecture.',
            position: { rowStart: 1, colStart: 1, colSpan: 3, rowSpan: 1 },
            styles: { fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' },
          },
          {
            type: 'video',
            content: vid,
            position: { rowStart: 2, colStart: 1, colSpan: 3, rowSpan: 2 },
          }
        ]
      },
      {
        id: 'sec3',
        dimension: 'archeology',
        author: {
          name: 'John Doe',
          profilePicture: bg
        },
        elements: [
          {
            type: 'text',
            content: 'Highlighted architectural dimensions:',
            position: { rowStart: 1, colStart: 1, colSpan: 2, rowSpan: 1 },
            styles: { fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold' },
          },
          {
            type: 'link',
            url: 'https://talents.esi.dz/scolar/index',
            content: "Learn more about Algiers' archeological sites",
            position: { rowStart: 2, colStart: 2, colSpan: 2, rowSpan: 2 },
            styles: { color: 'blue', textDecoration: 'underline' },
          },
          {
            type: 'shape',
            shapeType: 'triangle',
            position: { rowStart: 2, colStart: 2, colSpan: 2, rowSpan: 2 },
            styles: { fill: '#ffcc00', rotation: '45' },
          },
          {
            type: 'shape',
            shapeType: 'line',
            position: { rowStart: 4, colStart: 2, colSpan: 3, rowSpan: 1 },
            styles: { stroke: '#000', x1: 10, y1: 50, x2: 300, y2: 50, rotation: 0 },
          },
          {
            type: 'shape',
            shapeType: 'arrow',
            position: { rowStart: 5, colStart: 2, colSpan: 2, rowSpan: 1 },
            styles: { stroke: '#000', fill: 'transparent',x1: 10, y1: 50, x2: 50, y2: 50, rotation: 60 }
          },
          {
            type: 'shape',
            shapeType: 'circle',
            position: { rowStart: 2, colStart: 1, colSpan: 1, rowSpan: 1 },
            styles: { fill: '#3498db'}
          },
          {
            type: 'shape',
            shapeType: 'rectangle', // Can be 'line', 'arrow', 'rectangle', 'triangle', 'circle'
            position: { rowStart: 3, colStart: 1, colSpan: 2, rowSpan: 2 },
            styles: { fill: 'transparent', stroke: '#000', width: 100, height: 50 }
          },
          {
            type: 'table',
            position: { rowStart: 6, colStart: 1, colSpan: 3, rowSpan: 2 },
            content: {
              headers: ['Year', 'Architect', 'Style'],
              rows: [
                ['1930', 'Pierre', 'Art Deco'],
                ['1950', 'Ali', 'Modernist'],
                ['2000', 'Zaha Hadid', 'Futuristic']
              ]
            },
            styles: { border: '1px solid #000000', fontSize: '14px', textAlign: 'center' }
          }       
        ]
      }
    ],
    references: [
      { title: '"The Architectural Heritage of Algiers" - A. Benyamina, 2021',             
        styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
      },
      { title: 'National Institute of Urban Studies -', link: "https://www.nius-architecture.org" ,
        styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
      },
    ],
  },
];

const OpenedProjectPage = () => {
  const token = localStorage.getItem("token");
  const currentUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const isOwner = Projects[0].author.id === currentUser?.id; 
  const isProfessional = true;   // test, should be replaced by currentUser.isProfessional

  return (
      <div className='pt-12 flex flex-row gap-[1%] justify-center bg-[#FFFFF1] w-full min-h-screen '>
        <File project={Projects[0]} isOwner={isOwner} currentUser={currentUser} isProfessional={isProfessional}/>
        <ProjectSideBar project={Projects[0]} isOwner={isOwner} currentUser={currentUser} isProfessional={isProfessional}/>
    </div>
  )
}

export default OpenedProjectPage