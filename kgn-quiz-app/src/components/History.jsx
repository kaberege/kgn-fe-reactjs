import React from "react";
import { Link } from "react-router-dom";

export default function History() {
    return (
        <div>
            <h2>Quiz history</h2>
            <Link to="/">Go back</Link>
        </div>

    );
}