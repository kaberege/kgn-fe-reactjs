import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { GiTruck } from 'react-icons/gi';
import logo from '../assets/favicon.jpg';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Dark mode state
  const [loading, setLoading] = useState<boolean>(false);  //Loading state
  const navigate = useNavigate();


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('https://kaberege123.pythonanywhere.com/user/register/', {
        email: email,
        password: password,
        username: username,
      });
      console.log(response);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode && "dark"} dark:bg-gray-900 bg-gray-100`}>
      <div className='p-6 rounded-lg shadow-lg w-full max-w-xs dark:bg-gray-800 dark:text-white bg-white text-gray-900'>
        <div className="flex justify-between items-center mb-4 p-2">
          <img src={logo} alt="Logo" title='kgn log' className="w-11 h-11 rounded-full" />
          <button
            className="text-2xl text-gray-900 dark:text-white cursor-pointer"
            onClick={() => setIsDarkMode(prevMode => !prevMode)}
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
        <div className="flex items-center justify-center mb-6">
          <GiTruck className="text-4xl text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome to Your Trip Tracker!</h2>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">Create an Account</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              minLength={5}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer p-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800'}
             transition-colors duration-300 ease-in-out`}>
            {loading ? 'Submitting...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
