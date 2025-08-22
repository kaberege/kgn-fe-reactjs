import React from "react";
import Welcome from "./Welcome";
import About from "./About";
import Project from "./Project";
import Contact from "./Contact";
import type { HeaderProps } from "../types";

const Main: React.FC<Partial<HeaderProps>> = ({ mode }) => {
  return (
    <main>
      <Welcome mode={mode} />
      <div
        className={`${mode ? "bg-slate-900" : "light"} pt-6 transition-colors duration-300`}
      >
        <div className="container mx-auto flex flex-col gap-20 px-3 pb-10 sm:px-14">
          <About />
          <Project />
          <Contact />
          <div className="fixed bottom-4 left-2 z-50 transition duration-300 hover:scale-105 max-sm:hidden">
            <div className="relative h-24 w-24">
              <div className="absolute flex h-full w-full animate-spin items-center justify-center rounded-full border-t-4 border-blue-500"></div>
              <a
                href="mailto:kabgnestor@gmail.com"
                className="absolute top-4 left-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-slate-400 via-orange-500 to-green-800 text-xs font-semibold text-zinc-950"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
