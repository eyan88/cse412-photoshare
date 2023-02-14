import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../Root.css'
import Gallery from '../components/Gallery';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';

function Root() {

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <Gallery />
    </div>
  )
}

export default Root
