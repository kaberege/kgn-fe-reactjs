import quiz from "../assets/quiz-project.jpg";
import tenzy from "../assets/tenzy-project.jpg";
import vanilla from "../assets/web-project.jpg";
import profile from "../assets/kgn-profile.jpg";
import fire from "../assets/fire.jpg";
import space from "../assets/space.jpg";
import spaceThree from "../assets/space-3.jpg";
import type { RotateImageProps } from "../types";

export const rotateImages: RotateImageProps[] = [
  {
    class: "front",
    image: tenzy,
    title: "Front image",
  },
  {
    class: "back",
    image: fire,
    title: "Back image",
  },
  {
    class: "left",
    image: vanilla,
    title: "Left image",
  },
  {
    class: "right",
    image: space,
    title: "Right image",
  },
  {
    class: "top",
    image: quiz,
    title: "Top image",
  },
  {
    class: "bottom",
    image: spaceThree,
    title: "Bottom image",
  },
  {
    class: "behind",
    image: profile,
    title: "Behind image",
  },
];
