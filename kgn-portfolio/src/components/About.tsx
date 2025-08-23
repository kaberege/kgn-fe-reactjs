import React from "react";
import {
  FaReact,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaSass,
} from "react-icons/fa";
import {
  TbBrandJavascript,
  TbBrandTypescript,
  TbBrandNextjs,
  TbBrandReactNative,
  TbBrandTailwind,
} from "react-icons/tb";
import {
  SiExpo,
  SiExpress,
  SiGraphql,
  SiDjango,
  SiGithub,
  SiKubernetes,
} from "react-icons/si";

interface SkillsProps {
  icon: React.JSX.Element;
  skill: string;
}

const styleSummary: string =
  "font-bold text-3xl sm:text-4xl animate-bounce text-blue-950 transition-colors duration-300 dark:text-blue-200";
const styleDetails: string =
  "font-bold text-lg sm:text-xl animate-pulse text-blue-950 transition-colors duration-300 dark:text-blue-200";

const skillsSummary: SkillsProps[] = [
  { icon: <FaReact className={styleSummary} />, skill: "React.js" },
  { icon: <FaNodeJs className={styleSummary} />, skill: "Node.js" },
  { icon: <SiDjango className={styleSummary} />, skill: "Django" },
  { icon: <SiGraphql className={styleSummary} />, skill: "GraphQL" },
];

const skillsDetails: SkillsProps[] = [
  { icon: <FaHtml5 className={styleDetails} />, skill: "HTML5" },
  { icon: <FaCss3Alt className={styleDetails} />, skill: "CSS3" },
  { icon: <FaSass className={styleDetails} />, skill: "Sass" },
  { icon: <TbBrandTailwind className={styleDetails} />, skill: "TailwindCSS" },
  { icon: <TbBrandJavascript className={styleDetails} />, skill: "JavaScript" },
  { icon: <TbBrandTypescript className={styleDetails} />, skill: "TypeScript" },
  { icon: <FaReact className={styleDetails} />, skill: "React.js" },
  { icon: <TbBrandNextjs className={styleDetails} />, skill: "Next.js" },
  {
    icon: <TbBrandReactNative className={styleDetails} />,
    skill: "React Native",
  },
  {
    icon: <SiExpo className={styleDetails} />,
    skill: "Expo",
  },
  { icon: <FaNodeJs className={styleDetails} />, skill: "Node.js" },
  { icon: <SiExpress className={styleDetails} />, skill: "Express.js" },
  { icon: <FaPython className={styleDetails} />, skill: "Python" },
  { icon: <SiDjango className={styleDetails} />, skill: "Django" },
  { icon: <SiGraphql className={styleDetails} />, skill: "GraphQL" },
  { icon: <FaDocker className={styleDetails} />, skill: "Docker" },
  { icon: <SiKubernetes className={styleDetails} />, skill: "Kubernetes" },
  { icon: <FaGitAlt className={styleDetails} />, skill: "Git" },
  { icon: <SiGithub className={styleDetails} />, skill: "GitHub" },
];

export default function About() {
  return (
    <>
      <section id="about">
        <h2 className="mb-5 text-2xl font-bold text-zinc-950 transition-colors duration-300 sm:text-4xl dark:text-stone-100">
          About Me
        </h2>
        <p className="w-full max-w-5xl text-sm text-zinc-900 transition-colors duration-300 sm:text-lg dark:text-stone-100">
          I&apos;m a versatile software developer with strong expertise in
          <span className="font-semibold">
            {" "}
            HTML5, CSS3, JavaScript, TypeScript, and React.js &nbsp;
          </span>
          for building dynamic front-end applications. I also work extensively
          with
          <span className="font-semibold"> Next.js and React Native</span> to
          deliver modern web and mobile experiences. On the backend, I
          specialize in
          <span className="font-semibold"> Python (Django & DRF)</span> as well
          as
          <span className="font-semibold"> Node.js and Express.js</span>,
          designing scalable APIs with both REST and GraphQL. I am passionate
          about solving real-world problems with clean, efficient, and impactful
          software solutions, while collaborating closely with teams and
          stakeholders to bring ideas to life.
        </p>
        <div className="my-10 flex flex-row flex-wrap justify-center gap-12">
          {skillsSummary.map((value: SkillsProps, index: number) => (
            <div
              key={index}
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-x-indigo-800 border-y-yellow-400 bg-blue-400 shadow-md transition-transform duration-300 hover:scale-105 max-sm:mx-auto max-sm:h-64 max-sm:max-w-96 sm:h-72 sm:w-64"
            >
              {value.icon}
              <p className="mt-7 flex flex-col items-center justify-center text-base font-semibold text-zinc-950 transition-colors duration-300 sm:text-2xl dark:text-stone-100">
                <span>{value.skill}</span> <span>Developer</span>
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {skillsDetails.map((tech: SkillsProps, i: number) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full border border-blue-400 bg-blue-100 px-2 py-1 shadow-md transition hover:scale-105 sm:px-4 sm:py-2 dark:bg-blue-900"
            >
              {tech.icon}
              <span className="text-xs font-medium text-zinc-900 transition-colors duration-300 sm:text-sm dark:text-white">
                {tech.skill}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
