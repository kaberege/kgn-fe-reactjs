import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/todo">ToDo-List</Link>
            <Link to="/die">Teinzes Die</Link>
        </nav>
    )
}