import Post from './Post';
import { useEffect, useState } from 'react';

const Gallery = () => {
    const firstPost = {
        photo_id: '1',
        caption: "harbor",
        photoDate: "2022-01-10",
        album_id: "2",
        user_id: "1",
    };


    const [gallery, setGallery] = useState([firstPost]);

    // get all distinct posts from database and map to array
    // then do a Array.map function to render Posts components
    const getGallery = () => {
        const updatedPosts = [firstPost, firstPost, firstPost];
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
                    <Post />
                ))}
            </div>
        </div>
    )

}

export default Gallery;