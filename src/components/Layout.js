'use client'; // Ensure this component is client-side

import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const Layout = ({ children }) => {
  // Initialize theme state
  const [theme, setTheme] = useState(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // If saved theme exists, use it
    if (savedTheme) {
      return savedTheme;
    }
    
    // If no saved theme, check user system preference
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Return system preference if no saved theme
    return userPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    // Apply the theme to the document
    document.documentElement.className = theme;
    // Save the selected theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={theme}>
      <header className="p-4 bg-gray-100 dark:bg-gray-900">
        <nav className="mb-4">
          <Link href="/" className="mr-4 text-blue-500 dark:text-yellow-500">Home</Link>
          <Link href="/about" className="mr-4 text-blue-500 dark:text-yellow-500">About</Link>
          <Link href="/contact" className="text-blue-500 dark:text-yellow-500">Contact Us</Link>
        </nav>
        <button
          className="py-2 px-4 bg-blue-500 text-white dark:bg-yellow-500"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>
      <main>{children}</main>
      <footer className="p-4 bg-gray-100 dark:bg-gray-900 text-center">
        <p className="text-gray-800 dark:text-gray-200">Footer Content</p>
      </footer>
    </div>
  );
};

export default Layout;
