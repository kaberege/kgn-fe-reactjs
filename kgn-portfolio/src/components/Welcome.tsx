import React from "react";
import profile from "../assets/profile-colorless.png";
import type { HeaderProps } from "../types";
import ComputerSetup from "./vectors/ComputerSetup";

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
              Kaberege Godard Nestor
            </span>
            ,
          </h1>
          <p className="mt-5 text-xl font-semibold text-zinc-900 transition-colors duration-300 sm:text-2xl dark:text-white">
            A creative software developer dedicated to crafting dynamic web
            applications.
          </p>
        </div>
        <div className="flex grow items-center justify-center [perspective:1000px]">
          <div className="group relative w-11/12 max-w-[1000px] transition-transform duration-500 hover:scale-105 hover:[transform:rotateX(10deg)_rotateY(10deg)]">
            <ComputerSetup
              mode={mode}
              profileImg={profile}
              accentColor="#00D1FF"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
