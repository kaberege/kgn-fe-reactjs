import React from "react";
import { useParams, Outlet } from "react-router-dom";

export default function BlogPost(){

    console.log(useParams())
    const {postId} = useParams();
    return(
        <>
        <Outlet/>
        <div>profile {postId}</div>
        </>
        
    )
}