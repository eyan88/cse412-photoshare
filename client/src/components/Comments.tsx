import { useState } from "react";

const Comments = () => {

    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e: any) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setComments([...comments, newComment]);
        setNewComment('');
    };

    return (
        <>
            <h2 className='text-xl font-bold mb-2'>Comments</h2>
            <ul className='space-y-2'>
                {comments.map((comment, index) => (
                    <li key={index} className='border-b pb-2'>{comment}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
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
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
            </form>
        </>
    )
}

export default Comments;