import React, { useEffect, useState } from "react";

const Footer = () => {
    const [year, setYear] = useState(0); // State for updating current year

    useEffect(() => {
        const date = new Date();
        const y = date.getFullYear();
        setYear(y);
    }, []);

    return (
        <div className="my-footer ">
            <p> Copyright &copy; {year} <a
                href='https://kaberege.github.io/kgn.github.io/' target='_blank'
                title='Visit kgn website'>
                <span>KGN</span>
            </a>
                . All rights reserved.
            </p>
        </div>
    );
}

export default Footer;