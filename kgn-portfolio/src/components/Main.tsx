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
        </div>
      </div>
    </main>
  );
};

export default Main;
