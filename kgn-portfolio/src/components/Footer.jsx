import React from 'react';


const Footer = ({ mode }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={`${!mode ? "bg-gradient-130" : "bg-gradient-130-dark"} shadow-md text-gray-900 dark:text-white p-4 text-center transition-colors duration-300`}>
            <p className='text-sm text-gray-300 font-semibold'>Copyright &copy; {currentYear}
                <a
                    href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215"
                    target='_blank' rel="noopener noreferrer"
                    className='text-blue-500 hover:text-blue-700 dark:text-yellow-300 dark:hover:text-yellow-500 transition-colors duration-300' title='Visit kgn linkedin'
                >&nbsp;KGN
                </a>
                . All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;

