import { useEffect, useState } from "react";
import Album from "../components/Album";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [newAlbumName, setNewAlbumName] = useState('');

    const handleAlbumNameChange = (e: any) => {
        setNewAlbumName(e.target.value);
    }

    const createAlbum = async () => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/albums`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    album_name: newAlbumName,
                })
            })
            .then((res) => res.json())
            .then((res) => alert(res.msg))
    }

    const getAlbumsByUser = async () => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/albums/user`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((res) => res.json())
            .then((res) => {
                setAlbums(res);
            })
    }

    useEffect(() => {
        getAlbumsByUser();
    })

    return (
        <>
            <div className='w-screen items-center flex flex-col'>
                <div className="bg-white rounded-md shadow-md p-4 mb-4 w-2/3">
                    <h2 className="text-xl font-medium mb-2">Create Album</h2>
                    <form onSubmit={createAlbum}>
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Album Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter album title"
                                onChange={handleAlbumNameChange}
                                className="w-full py-2 px-3 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md transition duration-100"
                        >
                            Create
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-md shadow-md p-4 mb-4 w-5/6">
                    <h2 className="text-xl font-medium mb-2">Your Albums</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {albums.map((album: any) => (
                            <Album 
                                key={album.album_id}
                                album_id={album.album_id}
                                album_name={album.album_name}
                                user_id={album.user_id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Albums;