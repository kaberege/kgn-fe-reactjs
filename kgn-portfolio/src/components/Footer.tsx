import React from "react";
import type { HeaderProps } from "../types";

const Footer: React.FC<Partial<HeaderProps>> = ({ mode }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className={`${!mode ? "bg-gradient-130" : "bg-gradient-130-dark"} p-4 text-center text-gray-900 shadow-md transition-colors duration-300 dark:text-white`}
    >
      <p className="text-xs font-semibold text-gray-100">
        Copyright &copy;{currentYear}
        <a
          href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 transition-colors duration-300 hover:text-blue-300 dark:text-yellow-300 dark:hover:text-yellow-500"
        >
          &nbsp;KGN
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
