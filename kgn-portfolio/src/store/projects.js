import quiz from "../assets/quiz-project.jpg";
import tenzy from "../assets/tenzy-project.jpg";
import vanilla from "../assets/web-project.jpg";
import social from "../assets/social.jpg";
import weather from "../assets/weather.jpg";

export const projects = [
    {
        link: {
            href: "https://kaberege-quiz-app.vercel.app/",
            background: quiz
        },
        heading: "Quiz App",
        description: "Transforming the learning experience with an interactive quiz app that offers personalized assessments and progress tracking. Built on a user-friendly platform using React, JavaScript, and Tailwind CSS, it provides a seamless gateway to engaging and effective learning.",
        skills: [
            {
                class: "text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1  rounded-full transition-colors duration-300",
                content: "#React JS"
            },
            {
                class: "text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1  rounded-full transition-colors duration-300",
                content: "#Tailwind CSS"
            }
        ]
    },
    {
        link: {
            href: "https://kaberege.pythonanywhere.com/",
            background: social
        },
        heading: "Social Media API",
        description: "A comprehensive API, built with Django and Django REST Framework, simulates the functionalities of a social media platform, including post management, user interactions, notifications, JWT-based authentication...",
        skills: [
            {
                class: "text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1  rounded-full transition-colors duration-300",
                content: "#Django"
            },
            {
                class: "text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1  rounded-full transition-colors duration-300",
                content: "#REST API"
            },
            {
                class: "text-sm bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 p-1 rounded-full transition-colors duration-300",
                content: "#JWT Authentication"
            }
        ]
    },
    {
        link: {
            href: "https://kgn-weather-dashboard.vercel.app/", 
            background: weather  
        },
        heading: "Weather Dashboard",
        description: "A weather dashboard built with React, TypeScript, and Tailwind CSS, offering real-time forecasts, temperature, and humidity. Its sleek, responsive design ensures a seamless experience on both desktop and mobile devices for accurate weather updates.",
        skills: [
            {
                class: "text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1 rounded-full transition-colors duration-300",
                content: "#React JS"
            },
            {
                class: "text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1 rounded-full transition-colors duration-300",
                content: "#TypeScript"
            },
            {
                class: "text-sm bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 p-1 rounded-full transition-colors duration-300",
                content: "#Tailwind CSS"
            }
        ]
    },
    {
        link: {
            href: "https://kaberege-tenzies-game.vercel.app/",
            background: tenzy
        },
        heading: "Tenzies Game App",
        description: "Revolutionizing casual gaming with a fun and interactive Tenzies game app. Developed using React and CSS, this user-friendly platform offers an engaging experience while tracking player progress and providing hours of entertainment.",
        skills: [
            {
                class: "text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1  rounded-full transition-colors duration-300",
                content: "#React JS"
            },
            {
                class: "text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1  rounded-full transition-colors duration-300",
                content: "#CSS"
            }
        ]
    },
    {
        link: {
            href: "https://kaberege.github.io/kgn.github.io/",
            background: vanilla
        },
        heading: "Vanilla JS Website",
        description: "Showcasing the power of simplicity, this website is built using vanilla JavaScript and CSS. It provides an intuitive and responsive user experience, serving as a digital gateway to information and features without the complexity of frameworks.",
        skills: [
            {
                class: "text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1  rounded-full transition-colors duration-300",
                content: "#Vanilla JS"
            },
            {
                class: "text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1  rounded-full transition-colors duration-300",
                content: "#CSS"
            }
        ]
    },
];
