import React from 'react';

/*
const Footer = () => {
    const [year, setYear] = useState(0);  // Set current year

    //setting current year in the footer
    useEffect(() => {
        const date = new Date();
        const y = date.getFullYear();
        setYear(y);
    }, [])
    return (
        <footer className="bg-gray-800 text-white mt-16 p-4 text-center dark:text-slate-300 transition-colors duration-300">
            <p className='text-sm'>Copyright &copy; {year} <a href='https://kaberege.github.io/kgn.github.io/' target='_blank' className='text-blue-500 transition hover:text-blue-700' title='Visit kgn website'>KGN</a>. All rights reserved.</p>
        </footer>
    )
}

export default Footer
*/

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white mt-16 p-4 text-center dark:text-slate-300 transition-colors duration-300">
            <p className='text-sm'>Copyright &copy; {currentYear} <a href='https://kaberege.github.io/kgn.github.io/' target='_blank' rel="noopener noreferrer" className='text-blue-500 transition hover:text-blue-700' title='Visit KGN website'>KGN</a>. All rights reserved.</p>
        </footer>
    );
}

export default Footer;

