import React, { useState } from "react";
import favicon from "../assets/favicon.jpg";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaBars,
  FaWindowClose,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa";
import type { HeaderProps } from "../types";
import { navigationLinks, socials } from "../constants/header";

type SocialIconsProps = Record<string, React.JSX.Element>;

const socialIcons: SocialIconsProps = {
  linkedin: <FaLinkedin className="text-xl font-bold" />,
  discord: <FaDiscord className="text-xl font-bold" />,
  x: <FaXTwitter className="text-xl font-bold" />,
  instagram: <FaInstagram className="text-xl font-bold" />,
};

const Header: React.FC<HeaderProps> = ({ mode, handleMode }) => {
  const [hideNav, setHideNav] = useState<boolean>(true); //handle navigation bar close and open

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={`${
          mode ? "dark-nav" : "light-nav"
        } shadow-md shadow-zinc-400 transition-colors duration-300 dark:shadow-zinc-700`}
      >
        <div className="mx-auto flex max-w-7xl flex-row px-3 py-1">
          <div className="flex flex-grow flex-row items-center">
            <img
              src={favicon}
              alt="kgn logo"
              title="kgn logo"
              className="h-7 w-7 cursor-pointer rounded-full sm:h-11 sm:w-11"
            />
            <p className="hidden text-base font-bold text-zinc-950 transition-colors duration-300 lg:block dark:text-white">
              <span className="mx-3">|</span>
              Software developer
            </p>
          </div>
          <div
            onClick={() => setHideNav(false)}
            className="flex cursor-pointer items-center justify-center rounded-full p-1 text-xl font-bold transition-colors duration-300 hover:bg-slate-200 sm:hidden dark:hover:bg-slate-500"
          >
            <FaBars
              size={20}
              className="text-zinc-900 transition-colors duration-300 dark:text-white"
            />
          </div>
          <div
            className={`flex flex-col sm:flex-row sm:gap-10 ${
              hideNav
                ? "max-sm:-right-full max-sm:overflow-hidden"
                : "max-sm:right-0"
            } transition-[right,background-color] duration-300 ease-[linear,ease-in] max-sm:fixed max-sm:top-0 max-sm:h-full max-sm:w-1/2 max-sm:bg-slate-300 max-sm:p-3 max-sm:dark:bg-slate-600`}
          >
            <div
              onClick={() => setHideNav(true)}
              className="ml-auto flex cursor-pointer items-center justify-center rounded-full p-1 text-xl font-bold transition-colors duration-300 hover:bg-slate-200 sm:hidden dark:hover:bg-slate-500"
            >
              <FaWindowClose
                size={20}
                className="text-zinc-900 transition-colors duration-300 dark:text-white"
              />
            </div>
            <div className="mt-8 flex flex-col items-center gap-5 sm:mt-0 sm:flex-row sm:gap-3">
              <ul className="flex flex-col items-center gap-5 sm:flex-row sm:gap-3">
                {navigationLinks.map((nav, index) => (
                  <li
                    key={index}
                    className="flex items-center border-b-2 border-b-zinc-900/0 font-bold text-zinc-950 transition-colors duration-300 hover:border-b-zinc-900 dark:text-white dark:hover:border-b-white"
                  >
                    <a
                      href={nav.link}
                      target={nav.title === "Resume" ? "_blank" : "_self"}
                      className="text-sm sm:text-base"
                    >
                      {nav.title}
                    </a>
                  </li>
                ))}
              </ul>
              <div
                title="Toggle light/dark mode"
                className={`relative flex h-4 w-7 cursor-pointer items-center rounded-full bg-black transition-colors duration-300 dark:bg-white`}
                onClick={() => handleMode((prev) => !prev)}
              >
                <div
                  className={`absolute h-3 w-3 rounded-full bg-white transition-all duration-300 dark:right-0 dark:bg-black`}
                ></div>
              </div>
            </div>
            <ul className="hidden flex-row items-center justify-center gap-2 md:flex">
              {socials.map((social, index) => (
                <li key={index} className="flex items-center justify-center">
                  <a
                    href={social.link}
                    title={social.title}
                    target="_blank"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-amber-600 transition-colors duration-300 hover:bg-red-400 hover:text-cyan-300"
                  >
                    {socialIcons[social.title]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
