'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useTheme();

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-14 h-7 bg-gray-200 rounded-full relative">
        <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-300"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-purple-600 dark:to-indigo-700 rounded-full p-1 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-purple-500 dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-purple-600 dark:to-indigo-700 opacity-0 dark:opacity-100 transition-all duration-500 ease-in-out"></div>

      {/* Toggle circle */}
      <div
        className={`relative w-5 h-5 bg-white dark:bg-gray-100 rounded-full shadow-md transform transition-all duration-500 ease-in-out flex items-center justify-center ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {/* Sun icon */}
        <Sun
          className={`w-3 h-3 text-yellow-500 absolute transition-all duration-500 ease-in-out ${
            isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />

        {/* Moon icon */}
        <Moon
          className={`w-3 h-3 text-purple-600 absolute transition-all duration-500 ease-in-out ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
          }`}
        />
      </div>

      {/* Animated stars for dark mode */}
      <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200"></div>
      </div>

      {/* Animated sun rays for light mode */}
      <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-yellow-300 rounded-full transform -translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-yellow-300 rounded-full transform -translate-x-1/2 animate-pulse delay-75"></div>
        <div className="absolute left-0 top-1/2 w-1 h-0.5 bg-yellow-300 rounded-full transform -translate-y-1/2 animate-pulse delay-150"></div>
        <div className="absolute right-0 top-1/2 w-1 h-0.5 bg-yellow-300 rounded-full transform -translate-y-1/2 animate-pulse delay-225"></div>
      </div>
    </button>
  );
}
