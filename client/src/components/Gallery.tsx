import Post from './Post';
import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

const Gallery = () => {
    const [gallery, setGallery] = useState<any[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useOutletContext<any>();

    // get all distinct posts from database and map to array
    // then do a Array.map function to render Posts components
    const getGallery = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/posts',
                {
                    method: 'GET',
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    setGallery(res);
                })
        }
        catch (err) {
            console.log(err);
        }
    };

    // reset gallery on page refresh and load
    useEffect(() => {
        if (isLoggedIn) {
            getGallery();
        }
    });

    return (
        <>
            {isLoggedIn ?
                <div className="container my-12 mx-auto px-4 md:px-12 overflow-auto">
                    <h1 className="text-3xl">Gallery</h1>
                    <div className="mt-4 grid gap-8 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1">
                        {gallery.map((post) => (
                            <Post
                                key={post.photo_id}
                                photo_id={post.photo_id}
                                caption={post.caption}
                                photo_date={post.date_of_photo}
                                image_path={post.image_path}
                                album_id={post.album_id}
                                user_id={post.user_id}
                            />
                        ))}
                    </div>
                </div>
                : <p>Please register / log in to view images</p>
            }
        </>
    )
}

export default Gallery;