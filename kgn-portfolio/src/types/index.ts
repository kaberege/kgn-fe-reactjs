import React from "react";

export interface HeaderProps {
  mode: boolean;
  handleMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavigationLinks {
  link: string;
  title: string;
}

export type ProjectSkillStylesProps = Record<
  "blue" | "yellow" | "rose" | "teal" | "purple",
  string
>;

interface ProjectSkillProps {
  class: keyof ProjectSkillStylesProps;
  content: string;
}

interface ProjectLinkProps {
  href: string;
  background: string;
}

export interface ProjectProps {
  link: ProjectLinkProps;
  heading: string;
  description: string;
  skills: ProjectSkillProps[];
}

export interface ErrorProps {
  nameError: string;
  emailError: string;
  messageError: string;
}

export interface ContactProps {
  name: string;
  email: string;
  message: string;
}

export interface RotateImageProps {
  class: string;
  image: string;
  title: string;
}
