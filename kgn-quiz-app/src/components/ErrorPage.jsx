import React from "react";

// Simple error page for 404 not found
export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center p-5">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-2xl">Page Not Found</h2>
            <p className="mt-4">The page you are looking for does not exist.</p>
        </div>
    );
}
