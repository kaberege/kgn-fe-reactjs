import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { GiTruck } from "react-icons/gi";
import logo from "../assets/favicon.jpg";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Dark mode state
  const [loading, setLoading] = useState<boolean>(false); //Loading state
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const emailRegex: RegExp =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // For email validation

    // Check if email address is valid
    if (!emailRegex.test(email)) {
      setError("The email address is not valid.");
      return;
    }

    // Minimum length 8 characters, maximum length 30 characters
    if (password.length < 8 || password.length > 30) {
      setError("Password must be between 8 and 30 characters long.");
      return;
    }

    // At least one lowercase letter
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    // At least one number
    if (!/\d/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    // At least one special character (e.g., !@#$%^&*)
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    setLoading(true); // Initiate loading

    try {
      const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL; // or http://127.0.0.1:8000/
      const response = await axios.post(`${BACKEND_BASE_URL}/user/register/`, {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      });
      console.log(response);
      navigate("/login");
    } catch (err: any) {
      if (err?.message === "Network Error") {
        setError(err?.message);
      } else if (
        err?.response?.data?.email[0] === "user with this email already exists."
      ) {
        setError("A user with this email already exists!");
      } else {
        setError("Registration failed! Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-2 ${
        isDarkMode && "dark"
      } dark:bg-gray-900 bg-gray-100`}
    >
      <div className="p-3 rounded-lg shadow-lg w-full max-w-sm dark:bg-gray-800 dark:text-white bg-white text-gray-900">
        <div className="flex justify-between items-center mb-4 p-2">
          <img
            src={logo}
            alt="Logo"
            title="kgn log"
            className="w-10 h-10 rounded-full"
          />
          <button
            title="Toggle light/dark mode"
            className="text-xl text-gray-900 dark:text-white cursor-pointer"
            onClick={() => setIsDarkMode((prevMode) => !prevMode)}
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
        <div className="flex items-center justify-center mb-6">
          <GiTruck className="text-4xl text-blue-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Welcome to Your Trip Tracker!
          </h2>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
          Create an Account
        </h2>

        {error && <p className="text-red-500 text-center text-xs">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              First name
            </label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              minLength={2}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Last name
            </label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              minLength={2}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              minLength={5}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-1 rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
            }
             transition-colors duration-300 ease-in-out`}
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
