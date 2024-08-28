import React from "react";
import { useQuery } from "react-query";

const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (isError) {
        throw new Error('Network response was not ok');
      }
    return res.json();
}

export default function PostsComponent() {

    const { data, error, isLoading, refetch} = useQuery("fetchData", fetchPosts);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    return (
        <div>
            <h1>Posts</h1>
            <button onClick={() => refetch()}>Refetch Posts</button>
            {data.map(item => (
                <div key={item.id}>{item.title}</div>
            ))}
        </div>
    );
}