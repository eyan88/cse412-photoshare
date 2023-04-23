import { useEffect, useState } from "react";
import Friend from '../components/Friend';
import FriendSearch from '../components/FriendSearch';
import { useOutletContext } from "react-router-dom";

const Friends = () => {
    const [friends, setFriends] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useOutletContext<any>();

    const getFriends = async () => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/friends/`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(res => res.json())
            .then(data => setFriends(data))
    }

    useEffect(() => {
        if (isLoggedIn) {
            getFriends();
        }
    })

    return (
        <>
            {isLoggedIn ?
                <div className='flex flex-row content-between justify-evenly'>
                    <div className='w-1/2 m-4'>
                        <h2 className='text-lg font-semibold m-4'>Find Friends</h2>
                        <FriendSearch />
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 m-4 w-1/2 overflow-y-scroll'>
                        <h2 className='text-lg font-semibold mb-4'>Your Friends</h2>
                        {friends.map((friend) => (
                            <Friend
                                key={friend.friendship_id}
                                friend_of_user={friend.friend_of_user}
                                date_of_friendship={friend.date_of_friendship}
                            />
                        ))}
                    </div>
                </div> : <p>Please log in</p>}
        </>
    )
}

export default Friends;