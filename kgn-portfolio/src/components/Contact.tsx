import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin } from "react-icons/fa";
import quiz from "../assets/quiz-project.jpg";
import tenzy from "../assets/tenzy-project.jpg";
import vanilla from "../assets/web-project.jpg";
import profile from "../assets/kgn-g1.jpg";
import fire from "../assets/fire.jpg";
import space from "../assets/space.jpg";
import spaceThree from "../assets/space-3.jpg";

interface ErrorProps {
  nameError: string;
  emailError: string;
  messageError: string;
}

interface ContactProps {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorProps>({
    nameError: "",
    emailError: "",
    messageError: "",
  });
  const [contact, setContact] = useState<ContactProps>({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError({ nameError: "", emailError: "", messageError: "" });
    const errors: ErrorProps = {
      nameError: "",
      emailError: "",
      messageError: "",
    };

    if (!contact.name.trim()) errors.nameError = "Name can not be empty!";
    if (!contact.email.trim()) errors.emailError = "Email can not be empty!";
    if (!contact.message.trim())
      errors.messageError = "Message can not be empty!";

    const isError = Object.values(errors).filter((err) => err !== "");

    if (isError.length > 0) {
      setError(errors);
    } else {
      setLoading(true);
      emailjs
        .send(
          "service_opitb2h",
          "template_7h6lion",
          {
            user_name: contact.name,
            user_email: contact.email,
            to_name: "Kaberege",
            message: contact.message,
          },
          "_5dEgVCadgQYKbZGp",
        )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");

          //reset the form
          setContact({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch((err) => {
          console.error("Failed to send message. Error: ", err);
          alert("Failed to send message.");
        })
        .finally(() => setLoading(false));
    }
  }
  return (
    <>
      <section id="contact">
        <div className="cube">
          <div className="face front">
            <img src={tenzy} alt="Front" />
          </div>
          <div className="face back">
            <img src={fire} alt="Back" />
          </div>
          <div className="face left">
            <img src={vanilla} alt="Left" />
          </div>
          <div className="face right">
            <img src={space} alt="Right" />
          </div>
          <div className="face top">
            <img src={quiz} alt="Top" />
          </div>
          <div className="face bottom">
            <img src={spaceThree} alt="Bottom" />
          </div>
          <div className="face behind">
            <img src={profile} alt="Bottom" />
          </div>
        </div>
        <div className="relative w-full rounded-3xl bg-gray-50 p-6 transition-colors duration-300 max-xl:mt-20 max-sm:mt-10 xl:max-w-md dark:bg-gray-800">
          <h2 className="mb-5 text-4xl font-bold max-sm:text-2xl dark:text-stone-100">
            Contact Me
          </h2>
          <a
            href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215"
            title="kgn LinkedIn"
            target="_blank"
            className="absolute top-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-400 text-white transition-colors duration-300 hover:bg-red-600 hover:text-cyan-300"
          >
            <FaLinkedin className="text-xl font-bold" />
          </a>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-semibold transition-colors duration-300 dark:text-stone-100"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={contact.name}
                placeholder="What's your good name?"
                required
                className="rounded-md border p-2 dark:bg-stone-100"
                onChange={handleChange}
              />
              {error.nameError && (
                <p className="text-red-500">{error.nameError}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold transition-colors duration-300 dark:text-stone-100"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={contact.email}
                placeholder="What's your web address?"
                required
                className="rounded-md border p-2 dark:bg-stone-100"
                onChange={handleChange}
              />
              {error.emailError && (
                <p className="text-red-500">{error.emailError}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-semibold transition-colors duration-300 dark:text-stone-100"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={contact.message}
                placeholder="Write your message here..."
                required
                className="rounded-md border p-2 dark:bg-stone-100"
                onChange={handleChange}
              ></textarea>
              {error.messageError && (
                <p className="text-red-500">{error.messageError}</p>
              )}
            </div>
            <button
              type="submit"
              className={`rounded-md py-2 font-semibold text-white transition duration-300 ${loading ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"}`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
