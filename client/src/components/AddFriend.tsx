


const AddFriend = ({ user_id, first_name, last_name }: { user_id?:any, first_name?: any, last_name?: any }) => {

    const addFriend = async () => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/friends`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    friend_id: user_id,
                })
            })
            .then(res => res.json())
            .then(res => alert(res.msg))
    }

    return (
        <div className="flex items-center justify-between py-2 px-4 bg-white rounded-md shadow-md mb-4">
            <div className="flex items-center">
                <span className="text-gray-900 text-sm font-medium">{first_name + ' ' + last_name}</span>
            </div>
            <button onClick={addFriend} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md transition duration-100">
                Add Friend
            </button>
        </div>
    )
}

export default AddFriend;