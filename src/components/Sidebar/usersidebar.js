import logoLight from '../assets/lightlogo.png';  // Light mode logo
import logoDark from '../assets/darklogo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import DarkModeToggle from '../DarkModeToggle';

export default function Sidebar() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
    

  return (
    <>
      <nav className="md:left-0 z-40 sm:fixed fixed sm:w-full md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow bg-white dark:bg-slate-800 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-primary dark:text-gray-200 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white dark:bg-gray-900 m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"><Icon icon="ri:menu-2-fill" /></i>
          </button>

          {/* Brand */}
          <div className="relative">
            <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 absolute top-0 end-0 md:hidden" aria-hidden="true" id="iconSidenav">h</i>
            <Link className="navbar-brand flex m-0" to="/user">
           {/* Conditionally render the logo based on the current theme using Tailwind's dark mode */}
           <img
                src={logoLight}
                className="h-16 block dark:hidden"
                alt="light_mode_logo"
              />
              <img
                src={logoDark}
                className="h-16 hidden dark:block"
                alt="dark_mode_logo"
              />
              <span className="hidden sm:inline-block ms-1 text-xs font-bold text-primary dark:text-gray-200"> <br /> </span>                
            </Link>
          </div>

          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <button className="p-2 mr-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex">
              <Icon icon="ph:user" />
            </button>
            <DarkModeToggle />
          </ul>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
           >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 ">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link className="navbar-brand flex m-0" to="/user">
                  <img
                      src={logoLight}
                      className="h-10 block dark:hidden"
                      alt="light_mode_logo"
                    />
                    <img
                      src={logoDark}
                      className="h-10 hidden dark:block"
                      alt="dark_mode_logo"
                    />
                    <span className="ms-1 text-xs font-bold text-primary dark:text-gray-200"><br></br></span>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-primary dark:text-gray-200 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <Icon icon="ic:outline-close" />
                  </button>
                </div>
              </div>
            </div>

            {/* Menu */}
            <ul className="md:flex-col text-base font-medium leading-normal md:min-w-full text-primary dark:text-gray-200 flex flex-col list-none">
              <li className={"font-semibold items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-white hover:bg-primary dark:hover:bg-gray-700 px-4 rounded-lg " +
                   (window.location.href.indexOf("/user") !== -1 
                     ? "translate-y-1 scale-110 duration-300 text-white bg-primary dark:bg-gray-700"
                     : "")
                     }>
                <Link className={"text-xs flex py-3 block"} to="/user">
                  <Icon icon="ic:outline-dashboard" className="mr-2 text-sm" />
                  Dashboard
                </Link>
              </li>


              <li className={"font-semibold items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-white hover:bg-primary dark:hover:bg-gray-700 px-4 rounded-lg " +
                   (window.location.href.indexOf("/reservations") !== -1 
                     ? "translate-y-1 scale-110 duration-300 text-white bg-primary dark:bg-gray-700"
                     : "")
                     }>
                <Link className="text-xs flex py-3 block" to="/reservations">
                  <Icon icon="fluent-mdl2:timeline-delivery" className="mr-2 text-sm" />
                  Reservations
                </Link>
              </li>

              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
