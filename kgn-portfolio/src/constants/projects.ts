import quiz from "../assets/quiz-project.jpg";
import tenzy from "../assets/tenzy-project.jpg";
import vanilla from "../assets/web-project.jpg";
import travel from "../assets/travel.jpg";
import weather from "../assets/weather.jpg";
import tripLog from "../assets/tripLog.jpg";
import type { ProjectProps, ProjectSkillStylesProps } from "../types";

export const skillStyles: ProjectSkillStylesProps = {
  blue: "text-xs sm:text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1 rounded-full transition-colors duration-300",

  yellow:
    "text-xs sm:text-sm bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 p-1 rounded-full transition-colors duration-300",

  rose: "text-xs sm:text-sm bg-rose-100 dark:bg-rose-800 text-rose-800 dark:text-rose-200 p-1 rounded-full transition-colors duration-300",

  teal: "text-xs sm:text-sm bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-200 p-1 rounded-full transition-colors duration-300",

  purple:
    "text-xs sm:text-sm bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 p-1 rounded-full transition-colors duration-300",
};

export const projects: ProjectProps[] = [
  {
    link: {
      href: "https://kaberege-quiz-app.vercel.app/",
      background: quiz,
    },
    heading: "Quiz App",
    description:
      "Transforming the learning experience with an interactive quiz app that offers personalized assessments and progress tracking. Built on a user-friendly platform using React, JavaScript, and Tailwind CSS, it provides a seamless gateway to engaging and effective learning.",
    skills: [
      {
        class: "blue",
        content: "React JS",
      },
      {
        class: "yellow",
        content: "Tailwind CSS",
      },
    ],
  },
  {
    link: {
      href: "https://kaberege.pythonanywhere.com/",
      background: travel,
    },
    heading: "Travel App API",
    description:
      "A robust travel booking and trip management API built with Django and Django REST Framework. It supports features like user authentication with JWT, trip listings, booking management, and payment integration...",
    skills: [
      {
        class: "blue",
        content: "Django",
      },
      {
        class: "yellow",
        content: "Django REST Framework",
      },
      {
        class: "rose",
        content: "JWT Authentication",
      },
      {
        class: "teal",
        content: "MySQL",
      },
    ],
  },
  {
    link: {
      href: "https://kgn-truck-trip-tracker.vercel.app/",
      background: tripLog,
    },
    heading: "Trip Tracker Application",
    description:
      "A comprehensive full-stack application built with Django, Django REST Framework, and React for the frontend interface with TypeScript ensuring type safety. The app tracks trip details like stops...",
    skills: [
      {
        class: "blue",
        content: "Django",
      },
      {
        class: "yellow",
        content: "Django REST Framework",
      },
      {
        class: "rose",
        content: "React TS",
      },

      {
        class: "teal",
        content: "TypeScript",
      },
      {
        class: "purple",
        content: "Tailwind CSS",
      },
    ],
  },
  {
    link: {
      href: "https://kgn-weather-dashboard.vercel.app/",
      background: weather,
    },
    heading: "Weather Dashboard",
    description:
      "A weather dashboard built with React, TypeScript, and Tailwind CSS, offering real-time forecasts, temperature, and humidity. Its sleek, responsive design ensures a seamless experience on both desktop and mobile devices for accurate weather updates.",
    skills: [
      {
        class: "blue",
        content: "React TS",
      },
      {
        class: "yellow",
        content: "TypeScript",
      },
      {
        class: "rose",
        content: "Tailwind CSS",
      },
    ],
  },
  {
    link: {
      href: "https://kaberege-tenzies-game.vercel.app/",
      background: tenzy,
    },
    heading: "Tenzies Game App",
    description:
      "Revolutionizing casual gaming with a fun and interactive Tenzies game app. Developed using React and CSS, this user-friendly platform offers an engaging experience while tracking player progress and providing hours of entertainment.",
    skills: [
      {
        class: "blue",
        content: "React JS",
      },
      {
        class: "yellow",
        content: "CSS",
      },
    ],
  },
  {
    link: {
      href: "https://kaberege.github.io/kgn.github.io/",
      background: vanilla,
    },
    heading: "Vanilla JS Website",
    description:
      "Showcasing the power of simplicity, this website is built using vanilla JavaScript and CSS. It provides an intuitive and responsive user experience, serving as a digital gateway to information and features without the complexity of frameworks.",
    skills: [
      {
        class: "blue",
        content: "Vanilla JS",
      },
      {
        class: "yellow",
        content: "CSS",
      },
    ],
  },
];
