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
  "class1" | "class2" | "class3" | "class4" | "class5",
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
