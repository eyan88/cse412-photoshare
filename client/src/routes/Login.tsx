import { useState } from 'react';

const Login = () => {
    const [registerData, setRegisterData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        date_of_birth: '',
        hometown: '',
        gender: ''
    });

    const handleOnChange = (e: any) => {
        e.preventDefault();
        const newFormData = registerData;
        const { value, name } = e.target;
        switch (name) {
            case 'email':
                newFormData.email = value;
                break;
            case 'password':
                newFormData.password = value;
                break;
            case 'first_name':
                newFormData.first_name = value;
                break;
            case 'last_name':
                newFormData.last_name = value;
                break;
            case 'date_of_birth':
                newFormData.date_of_birth = value;
                break;
            case 'hometown':
                newFormData.hometown = value;
                break;
            case 'gender':
                newFormData.gender = value;
                break;
        }
        setRegisterData(newFormData);
    }

    // TODO: Add Submit function to submit to backend for register user
    const registerSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/users', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(registerData),
        })
        .then((response => {
            if(!response.ok) {
                throw new Error(`HTTP error, status code: ${response.status}`);
            }
            return response;
        }))
        .then((response) => response.json())
        .catch((error) => console.log(error));
    }

    // TODO: Add Submit function to submit to backend for login user (JWT)

    return (
        <div className='container my-12 mx-auto px-4 md:px-12 overflow-auto'>

            <h1 className='text-3xl mt-4 mb-4'>Register</h1>
            <form className='flex flex-col' onSubmit={registerSubmit}>
                <label className=''>Email:
                    <input type='email' name='email' onChange={handleOnChange} className='mx-4 my-2 border border-black'></input>
                </label>
                <label>Password:
                    <input type='password' name='password' onChange={handleOnChange} className='mx-4 my-2 border border-black'></input>
                </label>
                <label>First Name:
                    <input type='text' name='first_name' onChange={handleOnChange} className='mx-4 my-2 border border-black'></input>
                </label>
                <label>Last Name:
                    <input type='text' name='last_name' onChange={handleOnChange} className='mx-4 my-2 border border-black'></input>
                </label>
                <label>Date of Birth:
                    <input type='date' name='date_of_birth' onChange={handleOnChange} className='mx-4 my-2 border border-black'></input>
                </label>
                <label>Home Town:
                    <input type='text' name='hometown' onChange={handleOnChange} className='mx-4 my-2 border border-black'></input>
                </label>
                <label>Gender:
                    <input type='text' name='gender' onChange={handleOnChange} className='mx-4 my-2 border border-black'></input>
                </label>
                <input type='submit' value='Register' className='bg-gray-900 text-gray-300 p-2 rounded w-28 hover:bg-gray-700'></input>
            </form>

            <h1 className='text-3xl mt-4 mb-4'>Login</h1>
            <form className='flex flex-col'>
                <label>Email:
                    <input type='email' className='mx-4 my-2 border border-black'></input>
                </label>
                <label>Password
                    <input type='password' className='mx-4 my-2 border border-black'></input>
                </label>
                <input type='submit' value='Login' className='bg-gray-900 text-gray-300 p-2 rounded w-28 hover:bg-gray-700'></input>
            </form>

        </div>
    );
}

export default Login;