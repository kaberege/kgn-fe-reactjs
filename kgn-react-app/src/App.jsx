import React, { useState } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

export default function App() {
    const [hide, setHide] = useState(true);

    return (
        <div className="my-app">
            <header>
                <Header hide={hide} />
                <p
                    className="bar-nav"
                    onClick={() => setHide(prev => !prev)}
                >&#9776;</p>
            </header>

            <main className="main-app">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>

        </div>
    );
}