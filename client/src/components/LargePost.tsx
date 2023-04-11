import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';

const url = 'http://localhost:5000/';

const LargePost = () => {
    const [postInfo, setPostInfo] = useState({
        photo_id: '',
        caption: '',
        date_of_photo: '',
        user_id: '',
        album_id: '',
        image_path: ''
    });

    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');

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

    const handleCommentChange = (e: any) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setComments([...comments, newComment]);
        setNewComment('');
    };

    // update photo info
    useEffect(() => {
        getPostDetails();
    }, []);

    // second div is for comments section
    return (
        <>
            <div>
                <div>
                    <h1 className='text-3xl font-bold mb-4'>{postInfo.caption}</h1>
                    <div className='mb-4 flex flex-col items-center content-center'>
                        <div>{postInfo.user_id}</div>
                        <div>{formatDate(postInfo.date_of_photo)}</div>
                        <div>{postInfo.photo_id}</div>
                        <img className='w-5/6' src={url + postInfo.image_path}></img>
                    </div>
                </div>

                <h2 className='text-xl font-bold mb-2'>Comments</h2>
                <ul className='space-y-2'>
                    {comments.map((comment, index) => (
                        <li key={index} className='border-b pb-2'>{comment}</li>
                    ))}
                </ul>

                <form onSubmit={handleSubmit}>
                    <label className='block mb-2 font-bold'>
                        Add a comment:
                        <input
                            type='text'
                            value={newComment}
                            onChange={handleCommentChange}
                            className='w-full border py-2 px-3 mb-2' />
                    </label>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default LargePost;