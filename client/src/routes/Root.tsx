import { useState, createContext } from 'react'
import reactLogo from '../assets/react.svg'
import '../Root.css'
import { Outlet, useOutletContext } from 'react-router-dom';
import Sidebar from '../components/Sidebar';


function Root() {
  // state for user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-screen">
        <Sidebar 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Outlet context={[isLoggedIn, setIsLoggedIn]}/>
    </div>
  )
}

export default Root
