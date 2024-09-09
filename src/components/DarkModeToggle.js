import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved dark mode preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className='flex'>

    <button
      onClick={toggleDarkMode}
      className="p-2 mr-2 bg-gray-200 dark:bg-slate-900 flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full  focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
    >
      
      <Icon icon="line-md:light-dark-loop" />
    </button>
    </div>
  );
};

export default DarkModeToggle;
