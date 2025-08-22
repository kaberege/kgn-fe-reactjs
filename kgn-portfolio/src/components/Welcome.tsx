import React from "react";
import devLaptop from "../assets/devLaptop.jpg";
import profile from "../assets/kgn-g1.jpg";
import type { HeaderProps } from "../types";

const Welcome: React.FC<Partial<HeaderProps>> = ({ mode }) => {
  return (
    <>
      <section
        className={`flex min-h-screen w-full flex-col ${!mode ? "bg-light-gradient" : "bg-dark-gradient"} transition-colors duration-300`}
      >
        <div className="container mx-auto flex flex-col px-4 sm:px-10">
          <h1 className="mt-9 text-2xl font-bold text-zinc-950 transition-colors duration-300 sm:text-3xl md:text-4xl dark:text-white">
            Hello, I'm{" "}
            <span className="text-yellow-600 dark:text-yellow-300">
              Kaberege Godard Nestor,
            </span>
          </h1>
          <p className="mt-5 text-xl font-semibold text-zinc-900 transition-colors duration-300 sm:text-2xl dark:text-white">
            A creative software developer dedicated to crafting dynamic web
            applications.
          </p>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <div className="relative h-52 w-11/12 max-w-96 sm:h-80 sm:w-full sm:max-w-xl">
            <img
              src={devLaptop}
              alt="Developer machine"
              className="h-full w-full rounded-lg"
            />
            <div className="absolute top-4 left-1/3 flex h-20 w-20 items-center justify-center sm:top-5 sm:left-1/3 sm:h-40 sm:w-40">
              <img
                src={profile}
                alt="kgn picture"
                className="h-full w-full rounded-full transition-transform duration-300 hover:scale-105 hover:brightness-90"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
