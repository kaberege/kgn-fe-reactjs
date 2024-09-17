import React from "react";
import Search from "./Search";

export default function HomePage() {
    return (
        <>
            <h1>GitHub User Search</h1>
            <p className="text-red-500">Hosting with GitHub</p>
            <Search />
        </>

    );
}