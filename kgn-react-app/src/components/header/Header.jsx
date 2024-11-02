import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <nav className="nav-bar-header">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : "pending"}>
                Home
            </NavLink>
            <NavLink to="/die" className={({ isActive }) => isActive ? "active" : "pending"}>
                Tenzies Die
            </NavLink>
            <NavLink to="/todo" className={({ isActive }) => isActive ? "active" : "pending"} >
                ToDo-List
            </NavLink>
        </nav>
    )
}