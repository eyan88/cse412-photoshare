import { useEffect, useState } from "react";

const Album = ({ album_id, album_name, user_id }: { album_id?: any, album_name?: any, user_id?: any }) => {
    const [name, setName] = useState('');

    const getName = async () => {
        await fetch(`http://localhost:5000/api/users/search/${user_id}`)
            .then((res) => res.json())
            .then((res) => {
                setName(res[0].first_name + ' ' + res[0].last_name);
            })
    }

    const deleteAlbum = async () => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/albums/${album_id}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then((res) => res.json())
                .then((res) => alert(res.msg))
    }

    useEffect(() => {
        getName();
    }, [])

    return (
        <div className="bg-gray-200 rounded-md p-2 flex flex-row justify-between">
            <div>
                <h3 className="text-gray-900 font-medium text-sm mb-1">
                    {album_name}
                </h3>
                <p className="text-gray-500 text-xs">{name}</p>
            </div>
            <button onClick={deleteAlbum} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-100">
                Delete
            </button>
        </div>
    )
}

export default Album;