import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import "../index.css"

function Search() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setUserData(null);

        try {
            const data = await fetchUserData(username);
            setUserData(data);
        } catch (err) {
            setError("Looks like we cant find the user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleSearch} className="flex flex-col space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </form>

            {loading && <p className="mt-4 text-gray-500">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {userData && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                    <img
                        src={userData.avatar_url}
                        alt={userData.login}
                        className="w-24 h-24 rounded-full mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-semibold text-center">{userData.name || userData.login}</h2>
                    <a
                        href={userData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-2 text-blue-600 hover:underline text-center"
                    >
                        View Profile
                    </a>
                </div>
            )}
        </div>
    );
}

export default Search;
