import React,{useEffect, useState} from 'react';


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