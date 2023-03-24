import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../Root.css'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Root() {

  return (
    <div className="flex flex-col w-screen">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Root
