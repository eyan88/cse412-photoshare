import { useEffect, useState } from 'react';
import AddFriend from './AddFriend';

const FriendSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const debouncedTerm = useDebounce(searchTerm, 500);

    useEffect(
        () => {
            searchCharacters(debouncedTerm).then((results: any) => {
                setResults(results);
            });
        },
        [debouncedTerm]
    );

    function searchCharacters(search: any) {
        return fetch(
            `http://localhost:5000/api/users/search`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    search
                })
            }
        )
            .then((res) => res.json())
            .then((res) => res)
            .catch((error) => {
                console.error(error);
                return [];
            });
    }

    function useDebounce(value: any, delay: any) {
        // State and setters for debounced value
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(
            () => {
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);
                return () => {
                    clearTimeout(handler);
                };
            },
            [value, delay]
        );
        return debouncedValue;
    }

    return (
        <div className='bg-white rounded-lg shadow-md p-4 mb-4'>
            <label htmlFor='search' className='sr-only'>
                Search
            </label>
            <div className='relative m-4'>
                <input
                    type='text'
                    id='search'
                    placeholder='Search for users'
                    className='block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 leading-5 focus:outline focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className='overflow-y-scroll'>
                {results?.map((result) => (
                    <AddFriend
                        key={result.user_id}
                        user_id={result.user_id}
                        first_name={result.first_name}
                        last_name={result.last_name}
                    />
                ))}
            </div>
        </div>
    )
}

export default FriendSearch;