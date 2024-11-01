
import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import { FaReact } from "react-icons/fa";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";
import { FaLinkedin } from "react-icons/fa";
import { FiPlay } from 'react-icons/fi';
import quiz from "../assets/quiz-project.jpg";
import tenzy from "../assets/tenzy-project.jpg";
import vanilla from "../assets/web-project.jpg";
import devLaptop from "../assets/devLaptop.jpg";
import profile from "../assets/kgn-g1.jpg";
import fire from "../assets/fire.jpg";
import space from "../assets/space.jpg";
import spaceThree from "../assets/space-3.jpg";

const Main = ({ mode }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [contact, setContact] = useState(
        {
            name: "",
            email: "",
            message: ""
        }
    );


    function handleChange(e) {
        const { name, value } = e.target;
        setContact(prev => (
            {
                ...prev,
                [name]: value
            }
        ));

    }

    function handleSubmit(e) {
        e.preventDefault();
        setError({});
        const errors = {};

        if (!contact.name) errors.nameError = "Name can not be empty!";
        if (!contact.email) errors.emailError = "Email can not be empty!";
        if (!contact.message) errors.messageError = "Message can not be empty!";

        if (Object.keys(errors).length > 0) {
            setError(errors);
        } else {
            setLoading(true);
            emailjs.send("service_opitb2h", "template_7h6lion", {
                user_name: contact.name,
                user_email: contact.email,
                to_name: "Kaberege",
                message: contact.message,
            }, "_5dEgVCadgQYKbZGp")
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Message sent successfully!');

                    //reset the form
                    setContact(
                        {
                            name: "",
                            email: "",
                            message: ""
                        }
                    );
                })
                .catch((err) => {
                    console.error('Failed to send message. Error: ', err);
                    alert('Failed to send message.');
                })
                .finally(() => setLoading(false));

        }
    }

    return (
        <main>
            <section className={`h-screen w-full flex flex-col ${!mode? "bg-light-gradient": "bg-dark-gradient"}`}>
                <div className='flex flex-col w-full max-sm:px-4 max-xl:px-10 max-w-6xl mx-auto'>
                    <h1 className='text-4xl max-sm:text-3xl  md:text-5xl font-bold mt-9 dark:text-white'>
                        Hi, I'm <span className="text-yellow-600 dark:text-yellow-300">Kaberege Godard Nestor</span>
                    </h1>
                    <p className='text-2xl max-sm:text-xl  font-semibold dark:text-white mt-5'>
                        Innovative Software Developer, building web applications.
                    </p>
                </div>
                <div className="flex items-center justify-center flex-grow">
                    <div className='w-full max-sm:h-40 max-sm:max-w-96 sm:max-w-xl sm:h-80 relative'>
                        <img
                            src={devLaptop}
                            alt="Dev machine"
                            className='rounded-lg w-full h-full'
                        />
                        <div
                            className='absolute max-sm:top-3 max-sm:left-1/3 sm:top-5 sm:left-1/3 flex items-center justify-center max-sm:w-20 max-sm:h-20 w-40 h-40 '
                        >
                            <img
                                src={profile}
                                alt="kgn profile"
                                className='w-full h-full rounded-full cursor-pointer hover:scale-105 transition-transform duration-300'
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className={`${mode ? "bg-slate-900" : "light"} pt-6`}>
                <div className=' max-w-7xl mx-auto max-sm:px-3 sm:px-14 flex flex-col gap-20 pb-10'>
                    <section id="about">
                        <h2 className='text-4xl max-sm:text-2xl font-bold mb-5 dark:text-stone-100'>About Me</h2>
                        <p
                            className='max-w-4xl text-lg mb-10 dark:text-stone-100'
                        >
                            I am a skilled software developer with experience in JavaScript and TypeScript, as well as expertise in the React.js framework. A quick learner, I collaborate closely with clients to create efficient, scalable, and user-friendly solutions that address real-world problems. Let’s work together to bring your ideas to life!
                        </p>
                        <div className='dark:text-stone-100 flex flex-row flex-wrap justify-center w-full sm:max-w-4xl xl:max-w-7xl mx-auto gap-12'>
                            <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400  max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition'>
                                <FaReact className='font-bold text-4xl animate-bounce text-blue-950 dark:text-blue-200' />
                                <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'>
                                    <span>React</span> <span>Developer</span>
                                </p>
                            </div>
                            <div className='dark:text-stone-100 flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400  max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition'>
                                <TbBrandJavascript className='font-bold text-4xl animate-bounce text-blue-950 dark:text-blue-200' />
                                <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'>
                                    <span>JavaScript</span> <span>Developer</span>
                                </p>
                            </div>
                            <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400   max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition'>
                                <TbBrandTypescript className='font-bold text-4xl animate-bounce text-blue-950 dark:text-blue-200' />
                                <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'
                                ><span>TypeScript</span> <span>Developer</span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section id="projects">
                        <h2 className='text-4xl max-sm:text-2xl font-bold mb-5 dark:text-stone-100'>Projects</h2>
                        <p
                            className='max-w-4xl text-lg mb-10 dark:text-stone-100'
                        >
                            The following projects showcase my skills and experience through real-world examples of my work. They reflect my ability to solve complex problems, work with various technologies, and manage projects effectively.
                        </p>
                        <div className='flex flex-row flex-wrap justify-center gap-6 xl:grid xl:grid-cols-3'>
                            <div className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto p-4 bg-slate-400 dark:bg-gray-700 shadow-md rounded-2xl'>
                                <a href="#"
                                    title='Click to open'
                                    style={{ backgroundImage: `url(${quiz})` }}
                                    className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                                    <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 shadow-xl absolute right-3 top-10'>
                                        <FiPlay className='text-red-500 dark:text-red-300' />
                                    </div>
                                </a>
                                <h3 className='text-xl font-semibold dark:text-stone-100'>Quiz App</h3>
                                <p className='dark:text-stone-100'>
                                    Transforming the learning experience with an interactive quiz app that offers personalized assessments and progress tracking. Built on a user-friendly platform using React, JavaScript, and Tailwind CSS, it provides a seamless gateway to engaging and effective learning.

                                </p>
                                <p className='flex gap-1 text-gray-800 dark:text-gray-200'>
                                    <span className='text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1  rounded-full'>#React JS</span>
                                    <span className='text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1 rounded-full'>#Tailwind CSS</span>
                                </p>
                            </div>
                            <div className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto  p-4 bg-slate-400 dark:bg-gray-700 shadow-md rounded-2xl'>
                                <a href="#"
                                    title='Click to open'
                                    style={{ backgroundImage: `url(${tenzy})` }}
                                    className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                                    <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 shadow-xl absolute right-3 top-10'>
                                        <FiPlay className='text-red-500 dark:text-red-300' />
                                    </div>
                                </a>
                                <h3 className='text-xl font-semibold dark:text-stone-100'>Tenzies Game App</h3>
                                <p className='dark:text-stone-100'>
                                    Revolutionizing casual gaming with a fun and interactive Tenzies game app. Developed using React and CSS, this user-friendly platform offers an engaging experience while tracking player progress and providing hours of entertainment.
                                </p>
                                <p className='flex gap-1 text-gray-800 dark:text-gray-200'>
                                    <span className='text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1 rounded-full'>#React JS</span>
                                    <span className='text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1  rounded-full'>#CSS</span>
                                </p>
                            </div>
                            <div className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto p-4 bg-slate-400 dark:bg-gray-700 shadow-md rounded-2xl'>

                                <a href="#"
                                    title='Click to open'
                                    style={{ backgroundImage: `url(${vanilla})` }}
                                    className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                                    <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 shadow-xl absolute right-3 top-10'>
                                        <FiPlay className='text-red-500 dark:text-red-300' />
                                    </div>
                                </a>

                                <h3 className='text-xl font-semibold dark:text-stone-100'>Vanilla JS Website</h3>
                                <p className='dark:text-stone-100'>
                                    Showcasing the power of simplicity, this website is built using vanilla JavaScript and CSS. It provides an intuitive and responsive user experience, serving as a digital gateway to information and features without the complexity of frameworks.
                                </p>
                                <p className='flex gap-1 text-gray-800 dark:text-gray-200'>
                                    <span className='text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1 rounded-full'>
                                        #Vanilla JS
                                    </span>
                                    <span className='text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1  rounded-full'>
                                        #CSS
                                    </span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section id="contact">
                        <div className="cube">
                            <div className="face front"><img src={tenzy} alt="Front" /></div>
                            <div className="face back"><img src={fire} alt="Back" /></div>
                            <div className="face left"><img src={vanilla} alt="Left" /></div>
                            <div className="face right"><img src={space} alt="Right" /></div>
                            <div className="face top"><img src={quiz} alt="Top" /></div>
                            <div className="face bottom"><img src={spaceThree} alt="Bottom" /></div>
                            <div className="face behind"><img src={profile} alt="Bottom" /></div>
                        </div>

                        <div className='relative w-full xl:max-w-md bg-white dark:bg-gray-800 p-6 rounded-3xl max-sm:mt-10 max-xl:mt-20'>
                            <h2 className='text-4xl max-sm:text-2xl font-bold mb-5 dark:text-stone-100'>Contact Me</h2>
                            <a
                                href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215"
                                alt="LinkedIn kgn"
                                title="kgn LinkedIn"
                                target="_blank"
                                className="absolute top-1 right-1 flex items-center justify-center rounded-full w-8 h-8 bg-red-400 hover:bg-red-600 text-white hover:text-cyan-300 transition-colors duration-300"
                            >
                                <FaLinkedin className='font-bold text-xl' />
                            </a>
                            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="name" className="font-semibold dark:text-stone-100">Your Name</label>
                                    <input type="text" id="name" name="name" value={contact.name} placeholder="What's your good name?" className='border rounded-md p-2' onChange={handleChange} />
                                    {error.nameError && <p className='text-red-500'>{error.nameError}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="email" className="font-semibold dark:text-stone-100">Your Email</label>
                                    <input type="email" id="email" name="email" value={contact.email} placeholder="What's your web address?" className='border rounded-md p-2' onChange={handleChange} />
                                    {error.emailError && <p className='text-red-500'>{error.emailError}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="message" className="font-semibold dark:text-stone-100">Your Message</label>
                                    <textarea id="message" name="message" value={contact.message} placeholder="Write your message here..." className='border rounded-md p-2' onChange={handleChange}></textarea>
                                    {error.messageError && <p className='text-red-500'>{error.messageError}</p>}
                                </div>
                                <button type="submit" className='bg-blue-500 font-semibold text-white py-2 rounded-md hover:bg-blue-600 transition duration-300' disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </section>
                    <div className='max-sm:hidden fixed bottom-4 left-2 z-50 hover:scale-105 transition duration-300 '>
                        <div className='w-24 h-24 relative'>
                            <div className='w-full h-full absolute animate-spin flex items-center justify-center border-t-4 border-blue-500 rounded-full'>

                            </div>
                            <a href='mailto:kabgnestor@gmail.com'
                                className='text-sm absolute left-4 top-4 w-16 h-16  flex items-center justify-center bg-gradient-to-b from-slate-400 via-orange-500 to-green-900 rounded-full font-semibold'
                            >
                                Hire Me
                            </a>

                        </div>
                    </div>
                </div >
            </div>
        </main >
    )
}

export default Main


