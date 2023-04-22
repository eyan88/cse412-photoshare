import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import CommentSection from './CommentSection';

const url = 'http://localhost:5000/';

const LargePost = () => {
    // TODO: view users who have liked a photo

    const [postInfo, setPostInfo] = useState({
        photo_id: '',
        caption: '',
        date_of_photo: '',
        user_id: '',
        album_id: '',
        image_path: ''
    });

    const [name, setName] = useState('');
    const [likes, setLikes] = useState(0);

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

    const getName = async () => {
        try {
            await fetch(`http://localhost:5000/api/users/search/${postInfo.user_id}`)
                .then((res) => res.json())
                .then((res) => {
                    setName(res[0].first_name + " " + res[0].last_name);
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    const getLikes = async () => {
        try {
            await fetch(`http://localhost:5000/api/likes/${photo_id}`)
                .then((res) => res.json())
                .then((res) => {
                    setLikes(res[0].count);
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    const submitLike = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5000/api/likes/${photo_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(res => {
                    getLikes();
                });
        }
        catch (err) {
            console.log(err);
        }
    }

    // update photo info
    useEffect(() => {
        getPostDetails();
        getName();
        getLikes();
    }, [likes]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center mb-4">
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-gray-500">{`@${name} • ${formatDate(postInfo.date_of_photo)}`}</p>
                </div>
            </div>
            <div className='flex flex-col content-center items-center'>
                <img
                    className="m-4"
                    src={url + postInfo.image_path}
                    alt={'image of ' + postInfo.image_path}
                />
            </div>
            <p className="text-lg mb-4">{postInfo.caption}</p>
            <div className="flex justify-between">
                <div>
                    <span className="text-gray-500">{likes} likes</span>
                </div>
                <div>
                    <button onClick={submitLike} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-100">
                        Like
                    </button>
                </div>
            </div>

            <CommentSection />
        </div>
    )
}

export default LargePost;