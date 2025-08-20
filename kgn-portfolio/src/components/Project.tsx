import { FiPlay } from "react-icons/fi";
import { projects } from "../constants/projects.ts";

function Project() {
  return (
    <>
      <section id="projects">
        <h2 className="mb-5 text-4xl font-bold transition-colors duration-300 max-sm:text-2xl dark:text-stone-100">
          Projects
        </h2>
        <p className="mb-10 max-w-4xl text-lg transition-colors duration-300 dark:text-stone-100">
          The following projects showcase my skills and experience through
          real-world examples of my work. They reflect my ability to solve
          complex problems, work with various technologies, and manage projects
          effectively.
        </p>
        <div className="flex flex-row flex-wrap justify-center gap-6 xl:grid xl:grid-cols-3">
          {projects.map((value, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-4 rounded-2xl bg-slate-400 p-4 shadow-md transition-colors duration-300 sm:w-96 xl:w-auto dark:bg-gray-700"
            >
              <a
                href={value.link.href}
                target="_blank"
                title="Click to open"
                style={{ backgroundImage: `url(${value.link.background})` }}
                className={`relative h-60 w-full cursor-pointer rounded-2xl bg-cover bg-center bg-no-repeat max-sm:h-52`}
              >
                <div className="absolute top-10 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-slate-400 shadow-xl transition-colors duration-300 hover:bg-slate-600">
                  <FiPlay className="text-red-500 transition-colors duration-300 hover:text-red-700" />
                </div>
              </a>
              <h3 className="text-xl font-semibold transition-colors duration-300 dark:text-stone-100">
                {value.heading}
              </h3>
              <p className="transition-colors duration-300 dark:text-stone-100">
                {value.description}
              </p>
              <p className="flex flex-wrap gap-1 text-gray-800">
                {value.skills.map((skill, idx) => (
                  <span key={idx} className={skill.class}>
                    {skill.content}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Project;
