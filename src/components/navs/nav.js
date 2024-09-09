import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import DarkModeToggle from '../DarkModeToggle';
import { useNavigate } from 'react-router-dom';
import { AuthContext

 } from '../../context/AuthContext'; 
export default function Navbar() {
  const { setAuthData } = useContext(AuthContext); // Access auth context
  const navigate = useNavigate(); // For navigation after logout

  const handleLogout = () => {
    setAuthData(null); // Clear authentication state
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('email'); // Remove user info from localStorage if stored
    navigate('/login'); // Redirect to login or homepage after logout
  };

  return (
    <>
      {/* Navbar */}
      <nav className="shadow bg-white dark:bg-slate-800 hidden h-auto md:fixed md:inline-block absolute top-0 left-0 w-full z-10  md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              {/* <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              /> */}
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">

      
            <button
              className="p-2 mr-2 bg-gray-200 dark:bg-slate-900 flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
            >
              <Icon icon="ph:user" />
            </button>

            <button
              onClick={handleLogout} // Trigger logout on click
              className="p-2 mr-2 bg-gray-200 dark:bg-slate-900  flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
            >
              <Icon icon="ic:outline-logout" />
              <span className="ml-2">Logout</span>
            </button>
            <DarkModeToggle />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}