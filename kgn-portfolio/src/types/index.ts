import React from "react";

export interface HeaderProps {
  mode: boolean;
  handleMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavigationLinks {
  link: string;
  title: string;
}
