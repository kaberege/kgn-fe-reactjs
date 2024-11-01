import React from 'react';


const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='bg-gray-800 dark:bg-gray-950 dark:shadow-md text-white p-4 text-center'>
            <p className='text-sm'>Copyright &copy; {currentYear}
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

/*

const Footer = () => {
 

    return (
        <footer className="bg-gray-800 text-white mt-16 p-4 text-center dark:text-slate-300 transition-colors duration-300">
           
        </footer>
    );
}

export default Footer;
*/

