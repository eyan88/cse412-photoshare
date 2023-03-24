import React from 'react';


const Login = () => {
    // TODO: Add Submit function to submit to backend for register user

    // TODO: Add Submit function to submit to backend for login user (JWT)

    return (
        <div className="container my-12 mx-auto px-4 md:px-12 overflow-auto">
        
        <h1 className="text-3xl mt-4 mb-4">Register</h1>
        <form className="flex flex-col">
            <label className="">Email:
                <input type="email" className="mx-4 my-2 border border-black"></input>
            </label>
            <label>Password:
                <input type="password" className="mx-4 my-2 border border-black"></input>
            </label>
            <label>First Name:
                <input type="text" className="mx-4 my-2 border border-black"></input>
            </label>
            <label>Last Name:
                <input type="text" className="mx-4 my-2 border border-black"></input>
            </label>
            <label>Date of Birth:
                <input type="date" className="mx-4 my-2 border border-black"></input>
            </label>
            <label>Home Town:
                <input type="text" className="mx-4 my-2 border border-black"></input>
            </label>
            <label>Gender:
                <input type="gender" className="mx-4 my-2 border border-black"></input>
            </label>
            <input type="submit" value="Register" className="bg-gray-900 text-gray-300 p-2 rounded w-28 hover:bg-gray-700"></input>
        </form>

        <h1 className="text-3xl mt-4 mb-4">Login</h1>
        <form className="flex flex-col">
            <label>Email:
                <input type="text" className="mx-4 my-2 border border-black"></input>
            </label>
            <label>Password
                <input type="password" className="mx-4 my-2 border border-black"></input>
            </label>
            <input type="submit" value="Login" className="bg-gray-900 text-gray-300 p-2 rounded w-28 hover:bg-gray-700"></input>
        </form>

    </div>
    );
}

export default Login;