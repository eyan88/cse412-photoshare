import { useEffect, useState } from "react";
import formatDate from "../utils/formatDate";


const Comment = ({ photo_id, user_id, comment_text, date_of_comment }: { photo_id?: any, user_id?: any, comment_text?: any, date_of_comment?: any }) => {
    const [name, setName] = useState('');

    const getName = async () => {
        await fetch(`http://localhost:5000/api/users/search/${user_id}`)
            .then((res) => res.json())
            .then((res) => {
                setName(res[0].first_name + ' ' + res[0].last_name);
            })
    }

    useEffect(() => {
        getName();
    }, [])

    return (
        <>
            <li className='border-2 rounded p-1'>
                <div className="flex mb-4">
                    <div className="flex-grow">
                        <div className="flex items-center mb-2">
                            <p className="font-semibold mr-2">{name}</p>
                            <p className="text-gray-500 text-sm">{formatDate(date_of_comment)}</p>
                        </div>
                        <p className="text-lg">{comment_text}</p>
                    </div>
                </div>
            </li>
        </>

    )
}

export default Comment;