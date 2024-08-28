import React from "react";
import { useQuery } from "react-query";

const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return res.json();
}

export default function PostsComponent() {

    const { data, error, isLoading, refetch} = useQuery("fetchData", fetchData);

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