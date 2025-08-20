import { FaReact, FaPython } from "react-icons/fa";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";

const style =
  "font-bold text-4xl animate-bounce text-blue-950 dark:text-blue-200";

const about = [
  {
    icon: <FaReact className={style} />,
    skill: "React",
  },
  {
    icon: <TbBrandJavascript className={style} />,
    skill: "JavaScript",
  },
  {
    icon: <TbBrandTypescript className={style} />,
    skill: "TypeScript",
  },
  {
    icon: <FaPython className={style} />,
    skill: "Django",
  },
];

export default function About() {
  return (
    <>
      <section id="about">
        <h2 className="mb-5 text-4xl font-bold transition-colors duration-300 max-sm:text-2xl dark:text-stone-100">
          About Me
        </h2>
        <p className="mb-10 max-w-4xl text-lg transition-colors duration-300 dark:text-stone-100">
          I&apos;m a skilled software developer with expertise in JavaScript,
          TypeScript, and React.js for building dynamic front-end applications.
          Additionally, I have strong experience with Python, particularly in
          backend development using Django and Django REST Framework (DRF),
          where I focus on creating scalable, secure, and efficient APIs. As a
          quick learner, I am passionate about collaborating with stakeholders
          and understanding user needs to craft intuitive solutions that solve
          real-world problems. I&apos;m excited to bring your ideas to life with
          efficient and impactful software solutions.
        </p>
        <div className="mx-auto flex w-full flex-row flex-wrap justify-center gap-12 sm:max-w-4xl xl:max-w-7xl dark:text-stone-100">
          {about.map((value, index) => (
            <div
              key={index}
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-x-indigo-800 border-y-yellow-400 bg-blue-400 shadow-md transition-all duration-300 hover:scale-105 max-sm:mx-auto max-sm:h-64 max-sm:max-w-96 sm:h-72 sm:w-64"
            >
              {value.icon}
              <p className="mt-7 flex flex-col items-center justify-center text-xl font-semibold sm:text-2xl">
                <span>{value.skill}</span> <span>Developer</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
