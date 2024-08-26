import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <NavLink to="/"
                className={({ isActive }) => isActive ? "active" : "nav-link"}
            >Home</NavLink>
            <NavLink to="/favorite"
                className={({ isActive }) => isActive ? "active" : "nav-link"}
            >Favorites</NavLink>
            <NavLink to="/recomandation"
                className={({ isActive }) => isActive ? "active" : "nav-link"}
            >Recommendations</NavLink>
        </nav>
    );
}


export default Header;