import Post from './Post';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const Gallery = () => {
    const firstPost = {
        photo_id: 1,
        caption: "harbor",
        photo_date: "2022-01-10",
        album_id: 2,
        user_id: 1,
    };

    const secondPost = {
        photo_id: 2,
        caption: "harbor2",
        photo_date: "2022-01-10",
        album_id: 2,
        user_id: 1,
    };

    const [gallery, setGallery] = useState<any[]>([]);

    // get all distinct posts from database and map to array
    // then do a Array.map function to render Posts components
    const getGallery = () => {
        const updatedPosts = [firstPost, secondPost];
        setGallery(updatedPosts);
    };

    // reset gallery on page refresh and load
    useEffect(() => {
        getGallery();
    }, []);

    return (
        <div className="container my-12 mx-auto px-4 md:px-12 overflow-auto">
            <h1 className="text-3xl">Gallery</h1>
            <div className="mt-4 grid gap-8 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1">
                {gallery.map((post) => (
                    <Post 
                        photo_id={post.photo_id}
                        caption={post.caption}
                        photo_date={post.photo_date}
                        album_id={post.album_id}
                        user_id={post.user_id}
                    />
                ))}
            </div>
        </div>
    )

}

export default Gallery;