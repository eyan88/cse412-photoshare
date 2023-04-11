import { Link } from 'react-router-dom';


const Sidebar = () => {

    //TODO: add search functionality for photos

    //TODO: add album page for user

    return (
        <>
            <div className='flex flex-row justify-between items-center h-full text-gray-300 bg-gray-900'>
                <h1 className='m-2'> PhotoShare </h1>
                <div className='flex flex-row items-center border-gray-700'>
                    <Link to='gallery' className='flex items-center justify-center w-24 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 duration-100'>
                        <svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                        </svg>
                        <p> Gallery </p>
                    </Link>
                    <Link to='' className='flex items-center justify-center w-24 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 duration-100'>
                        <svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                        </svg>
                        <p> Search </p>
                    </Link>
                    <Link to='' className='flex items-center justify-center w-24 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 duration-100'>
                        <svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2' />
                        </svg>
                        <p> Albums </p>
                    </Link>
                    <Link to='' className='flex items-center justify-center w-24 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 duration-100'>
                        <svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2' />
                        </svg>
                        <p> Friends </p>
                    </Link>
                    <Link to='upload' className='flex items-center justify-center w-24 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 duration-100'>
                        <svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2' />
                        </svg>
                        <p> Upload </p>
                    </Link>
                </div>
                <Link to='loginpage' className='flex items-center justify-center w-16 h-16 mt-auto hover:bg-gray-700 hover:text-gray-300 duration-100'>
                    <svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                </Link>
            </div>
        </>
    )

}

export default Sidebar;