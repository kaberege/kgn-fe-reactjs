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
        <div className="mx-auto flex w-full max-w-6xl flex-col max-xl:px-10 max-sm:px-4">
          <h1 className="mt-9 font-bold transition-colors duration-300 max-sm:text-2xl sm:text-3xl md:text-4xl dark:text-white">
            Hello, I'm{" "}
            <span className="text-yellow-600 dark:text-yellow-300">
              Kaberege Godard Nestor,
            </span>
          </h1>
          <p className="mt-5 text-2xl font-semibold transition-colors duration-300 max-sm:text-xl dark:text-white">
            A creative software developer dedicated to crafting dynamic web
            applications.
          </p>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <div className="relative w-full max-sm:h-52 max-sm:max-w-96 sm:h-80 sm:max-w-xl">
            <img
              src={devLaptop}
              alt="Dev machine"
              className="h-full w-full rounded-lg"
            />
            <div className="absolute flex h-40 w-40 items-center justify-center max-sm:top-4 max-sm:left-1/3 max-sm:h-20 max-sm:w-20 sm:top-5 sm:left-1/3">
              <img
                src={profile}
                alt="kgn profile"
                className="h-full w-full cursor-pointer rounded-full transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
