import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LogoutComponent = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className='max-w-md mx-auto flex flex-col content-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h1 className='m-4'>Logged in</h1>
            <button
                onClick={handleLogout}
                className="bg-blue-500 w-28 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-100"
            >Log Out</button>
        </div>
    )
}

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useOutletContext<any>();

    return (
        <>
            {isLoggedIn ? <LogoutComponent /> : <LoginForm />}
        </>
    );
}

export default Login;