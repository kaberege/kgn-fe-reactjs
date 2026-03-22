import React, { useState } from "react";
import profile from "../assets/profile-colorless.png";
import type { HeaderProps } from "../types";
import ComputerSetup from "./vectors/ComputerSetup";

const Welcome: React.FC<Partial<HeaderProps>> = ({ mode }) => {
  // State to hold the rotation values
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();

    // Calculate cursor position relative to the center of the element
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    // Calculate rotation (adjust the divisor to increase/decrease sensitivity)
    // Rotating around Y axis based on Horizontal movement, X axis based on Vertical
    const rotateY = (x - centerX) / 20;
    const rotateX = (centerY - y) / 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section
      className={`flex min-h-screen w-full flex-col ${
        !mode ? "bg-light-gradient" : "bg-dark-gradient"
      } transition-colors duration-300`}
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

      <div className="flex grow items-center justify-center [perspective:1200px]">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.1s ease-out",
          }}
          className="group relative w-11/12 max-w-[1000px] will-change-transform"
        >
          <ComputerSetup
            mode={mode}
            profileImg={profile}
            accentColor="#00D1FF"
          />
        </div>
      </div>
    </section>
  );
};

export default Welcome;
