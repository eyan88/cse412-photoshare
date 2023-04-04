import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Post = ({ photo_id, caption, photo_date, album_id, user_id }: { photo_id?: string, caption?: string, photo_date?: string, album_id?: number, user_id: string }) => {
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
            <div className="max-w-sm w-full lg:flex">

                <div className="lg:h-auto lg:w-48 flex-none bg-cover text-center overflow-hidden">
                    <img className="object-center max-w-sm" src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt30cd60b083954711/634896353b9a3d285e1b6cc1/patch508_Banner.jpg"></img>
                </div>

                <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <div className="text-gray-900 font-bold text-xl mb-2">{`${caption}`}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none">{`${name}`}</p>
                            <p className="text-gray-600">{`${photo_date}`}</p>
                            <p className="text-gray-700 text-[10px]">#tag #valorant #harbor #inting #overflow</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Post