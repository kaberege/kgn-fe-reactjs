import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const styles = { color: "#3b5", padding: "10px", textDecoration: 'none' }
    return (
        <div style={{ paddingTop: "30px" }}>
            <Link to="/" style={styles}>Home</Link>
            <Link to="/about" style={styles}>About</Link>
            <Link to="/services" style={styles}>Services</Link>
            <Link to="/contact" style={styles}>Contact</Link>
        </div>
    );
}

export default Navbar;