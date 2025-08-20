import { Link } from "react-router";
import { FaHome, FaGhost } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-6 text-white">
      <div className="mb-4 flex items-center gap-4">
        <FaGhost className="text-3xl text-white drop-shadow-lg sm:text-6xl" />
        <h1 className="text-2xl font-extrabold drop-shadow-lg sm:text-7xl">
          404
        </h1>
      </div>

      <h2 className="mb-6 text-center text-xl font-semibold sm:text-3xl md:text-4xl">
        Oops! Page not found
      </h2>

      <p className="mb-8 max-w-xl text-center text-base leading-relaxed opacity-90 sm:text-lg md:text-xl">
        Looks like this page wandered off into the internet wilderness.
        Don&apos;t worry — let&apos;s get you back home.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 rounded-2xl bg-white px-3 py-1 font-semibold text-indigo-700 shadow-lg transition duration-300 hover:bg-gray-200 sm:px-6 sm:py-3"
      >
        <FaHome size={20} />
        <span className="text-sm font-semibold text-zinc-900">
          Go Back Home
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
