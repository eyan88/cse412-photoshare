import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";


const LargePost = () => {
    const [postInfo, setPostInfo] = useState({
        photo_id: '',
        caption: '',
        date_of_photo: '',
        user_id: '',
        album_id: '',
        image_path: ''
    });

    // get the photo_id param from URL
    const { photo_id } = useParams();

    // fetch the post details
    const getPostDetails = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${photo_id}`, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((data) => {
                    setPostInfo(data[0]);
                })
        }
        catch (err) {
            console.log(err);
        }
    };

    // update photo info
    useEffect(() => {
        getPostDetails();
    }, [])

    // second div is for comments section
    return (
        <>
            <div>
                <div>{postInfo.photo_id}</div>
                <div>{postInfo.caption}</div>
                <div>{formatDate(postInfo.date_of_photo)}</div>
                <div>{postInfo.user_id}</div>
                <div>{postInfo.image_path}</div>
            </div>
            <div className='border'>
                <h2 className='text-xl'>Comments</h2>
                <div>
                    <div>
                        this is a comment
                    </div>
                </div>
            </div>
        </>
    )
}

export default LargePost;