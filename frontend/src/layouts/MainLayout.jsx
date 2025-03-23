import React from 'react'
import NavbarNormal from '../components/NavbarNormal'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <div>
        <NavbarNormal />
        <main className="pt-16">
          <Outlet />
        </main>
      </div>
    </>
  )
}
