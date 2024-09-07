import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright text */}
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Hb-lab Ltd. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex space-x-4 text-center md:text-left">
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
              Privacy Policy
            </a>
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
              Terms of Service
            </a>
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
