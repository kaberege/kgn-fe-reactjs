import React,{useState} from 'react';
import emailjs from "@emailjs/browser";
import { FaLinkedin } from "react-icons/fa";
import quiz from "../assets/quiz-project.jpg";
import tenzy from "../assets/tenzy-project.jpg";
import vanilla from "../assets/web-project.jpg";
import profile from "../assets/kgn-g1.jpg";
import fire from "../assets/fire.jpg";
import space from "../assets/space.jpg";
import spaceThree from "../assets/space-3.jpg";

export default function Contact() {
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
        <>
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
                <div className='relative w-full xl:max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl max-sm:mt-10 max-xl:mt-20 transition-colors duration-300'>
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
                            <label htmlFor="name" className="font-semibold dark:text-stone-100 transition-colors duration-300">Your Name</label>
                            <input type="text" id="name" name="name" value={contact.name} placeholder="What's your good name?" className='border rounded-md p-2' onChange={handleChange} />
                            {error.nameError && <p className='text-red-500'>{error.nameError}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className="font-semibold dark:text-stone-100 transition-colors duration-300">Your Email</label>
                            <input type="email" id="email" name="email" value={contact.email} placeholder="What's your web address?" className='border rounded-md p-2' onChange={handleChange} />
                            {error.emailError && <p className='text-red-500'>{error.emailError}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="message" className="font-semibold dark:text-stone-100 transition-colors duration-300">Your Message</label>
                            <textarea id="message" name="message" value={contact.message} placeholder="Write your message here..." className='border rounded-md p-2' onChange={handleChange}></textarea>
                            {error.messageError && <p className='text-red-500'>{error.messageError}</p>}
                        </div>
                        <button type="submit" className='bg-blue-500 font-semibold text-white py-2 rounded-md hover:bg-blue-600 transition duration-300' disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}
