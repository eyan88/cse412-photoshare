import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';

const Post = ({ photo_id, caption, photo_date, album_id, user_id }: { photo_id?: string, caption?: string, photo_date: string, album_id: string, user_id: string }) => {
    const [name, setName] = useState('');

    //TODO: get the user who posted a post from the user_id prop
    const getName = async () => {
        await fetch(`http://localhost:5000/api/users/${user_id}`)
            .then((res) => res.json())
            .then((res) => {
                setName(res[0].first_name + " " + res[0].last_name);
            })
    }

    //TODO: get the tags on a photo with photo_id
    useEffect(() => {
        getName();
    }, [])

    return (
        // TODO: Create a photo post element that will be displayed when user clicks a photo
        // in the gallery. This page should house all comments and likes of that post.

        <Link to={`/posts/${photo_id}`}>
            <div className='w-full border flex flex-col'>
                <div className='flex flex-col m-2'>
                    <div className="text-sm flex flex-row place-content-between">
                        <p className="text-gray-900 leading-none font-bold">{`${name}`}</p>
                        <p className="text-gray-600">{`${formatDate(photo_date)}`}</p>
                    </div>
                </div>

                <div className="">
                    <img className="w-full max-h-[500px]" src='https://img.redbull.com/images/c_crop,w_1140,h_570,x_0,y_0,f_auto,q_auto/c_scale,w_1200/redbullcom/2023/1/24/ngljfqaupmiywuqas5tl/harbor-valorant' alt="" />
                </div>

                <div>
                    <div className="m-4">
                        <div className="text-gray-900 font-bold text-xl mb-2">{`${caption}`}</div>
                        <p className="text-gray-700 text-[10px]">#tag #valorant #harbor #inting #overflow</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Post;