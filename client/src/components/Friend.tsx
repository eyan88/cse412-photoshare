import { useEffect, useState } from "react";



const Friend = ({friend_of_user, date_of_friendship}:{friend_of_user?:any, date_of_friendship?:any}) => {
    const [name, setName] = useState('');
    
    const getName = async () => {
        await fetch(`http://localhost:5000/api/users/search/${friend_of_user}`)
            .then((res) => res.json())
            .then((res) => {
                setName(res[0].first_name + " " + res[0].last_name);
            })
    }

    useEffect(() => {
        getName();
    }, [])

    return (
        <>
            <div className='flex items-center mb-4'>
                <div>
                    <p className='font-semibold'>{name}</p>
                    <p className='text-gray-500'>Added on {date_of_friendship}</p>
                </div>
            </div>
        </>
    )
}

export default Friend;