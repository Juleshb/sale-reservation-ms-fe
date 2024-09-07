import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import logo from './assets/hblablogo.png';
import { Icon } from '@iconify/react';
import { AuthContext } from '../context/AuthContext'; // Assume you have an AuthContext for managing auth state

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setAuthData } = useContext(AuthContext); // Access auth context
  const navigate = useNavigate(); // For navigation after logout

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle mobile menu
  };

  const handleLogout = () => {
    setAuthData(null); // Clear authentication state
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('email'); // Remove user info from localStorage if stored
    navigate('/login'); // Redirect to login or homepage after logout
  };

  return (
    <nav className="bg-primary dark:bg-gray-800 shadow fixed top-0 left-0 right-0 z-50">
      {/* Fixed Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10 w-10 mr-2 rounded-full" />
            </Link>
            <Link to="/" className="text-sm font-light text-secondary dark:text-white">
              Hb-lab ltd
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              className="p-2 bg-gray-200 flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
            >
              <Icon icon="ph:user" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-secondary hover:text-secondary dark:text-secondary dark:hover:text-gray-500 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-secondary dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Home
            </Link>
            <Link
              to="/add-room"
              className="text-secondary dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Add Room
            </Link>

            <Link to="/my-reservations" className="text-secondary dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
             My Reservations
           </Link>

          </div>

          <div className="hidden md:flex items-center">
            <DarkModeToggle />
            <button
              className="p-2 mr-2 bg-gray-200 flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
            >
              <Icon icon="ph:user" />
            </button>
            <button
              onClick={handleLogout} // Trigger logout on click
              className="p-2 mr-2 bg-gray-200 flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
            >
              <Icon icon="ic:outline-logout" />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className={`md:hidden transition-all duration-300 ease-out transform h-screen ${
              isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link
                to="/"
                onClick={toggleMenu}
                className="text-secondary dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
              >
                Home
              </Link>
              <Link
                to="/add-room"
                onClick={toggleMenu}
                className="text-secondary dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
              >
                Add Room
              </Link>
              <Link to="/my-reservations" className="text-secondary dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
             My Reservations
            </Link>
              <button
                className="p-2 bg-gray-200 flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
              >
                <Icon icon="ph:user" />
              </button>
              <button
                onClick={handleLogout} // Trigger logout on click in mobile menu
                className="p-2 mr-2 bg-gray-200 flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
              >
                <Icon icon="ic:outline-logout" />
                <span className="ml-2">Logout</span>
              </button>
              <DarkModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
