import React from "react";
import { useQuery } from "react-query";

const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
}

export default function PostsComponent() {
    // Using the useQuery hook to fetch posts
    const { data, error, isLoading, isFetching, refetch, isPreviousData, isError } = useQuery('posts', fetchPosts, {
        cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
        staleTime: 5 * 60 * 1000,  // Data is considered fresh for 5 minutes
        refetchOnWindowFocus: true, // Refetch data when the window regains focus
        keepPreviousData: true,     // Keep previous data while fetching new data
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error#: {error.message}</div>;
    if (isError) {
        return <div>Error&: {error.message}</div>; // Display an error message if an error occurs
    }

    return (
        <div>
            <h1>Posts</h1>
            <button onClick={() => refetch()}>Refetch Posts</button>
            {isFetching && <p>Updating...</p>} {/* Display a message while refetching */}
            <ul>
                {data.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
            <button onClick={() => refetch()}>Refetch Posts</button>
            {isPreviousData && <p>Loading new data...</p>} {/* Display a message while keeping previous data */}
        </div>
    );
}

