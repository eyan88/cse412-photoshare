import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        localStorage.getItem('token') ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, [])


    // TODO: Create logout button
    return (
        <>
            {isLoggedIn ? <div>Logged In!</div> : <LoginForm />}
        </>
    );
}

export default Login;