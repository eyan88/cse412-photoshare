import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";
import Comment from './Comment'

const CommentSection = () => {
    const { photo_id } = useParams<any>();
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e: any) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

        const commentData = {
            photo_id: photo_id,
            comment_text: newComment,
            date_of_comment: formattedDate
        }

        await fetch(`http://localhost:5000/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(commentData)
        })
        setNewComment('');
    };

    const getComments = async () => {
        await fetch(`http://localhost:5000/api/comments/${photo_id}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => {
                setComments(res);
            })
    }

    useEffect(() => {
        getComments();
    }, [comments])

    return (
        <>
            <h2 className='text-xl font-bold mb-2'>Comments</h2>
            <ul className='space-y-2'>
                {comments.map((comment) => (
                    <Comment 
                        key={comment.comment_id}
                        photo_id={comment.photo_id}
                        user_id={comment.user_id}
                        comment_text={comment.comment_text}
                        date_of_comment={comment.date_of_comment}
                    />
                ))}
            </ul>

            <label className='block mb-2'>
                Add a comment:
                <input
                    type='text'
                    value={newComment}
                    onChange={handleCommentChange}
                    className='w-full border py-2 px-3 mb-2' />
            </label>
            <button
                type='submit'
                onClick={handleSubmit}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
        </>
    )
}

export default CommentSection;