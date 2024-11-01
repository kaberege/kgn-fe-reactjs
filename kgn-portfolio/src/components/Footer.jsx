import React from 'react';


const Footer = ({ mode }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={`${!mode ? "bg-gradient-130" : "bg-gradient-130-dark"} shadow-md text-gray-900 dark:text-white p-4 text-center`}>
            <p className='text-sm text-gray-300 font-semibold'>Copyright &copy; {currentYear}
                <a
                    href='https://kaberege.github.io/kgn.github.io/'
                    target='_blank' rel="noopener noreferrer"
                    className='text-blue-500 transition hover:text-blue-700' title='Visit KGN website'
                >&nbsp;KGN
                </a>
                . All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;

