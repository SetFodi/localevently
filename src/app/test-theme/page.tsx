'use client';

import { useState, useEffect } from 'react';

export default function TestThemePage() {
  const [currentTheme, setCurrentTheme] = useState('');

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    };

    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🎨 Theme Toggle Test
          </h1>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-8 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Current Theme: <span className="text-blue-600 dark:text-blue-400">{currentTheme}</span>
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Click the beautiful animated toggle in the header to switch between light and dark modes. 
              You should see smooth transitions and the theme should persist when you refresh the page.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  ☀️ Light Mode Features
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Clean white backgrounds</li>
                  <li>• Dark text for readability</li>
                  <li>• Blue accent colors</li>
                  <li>• Sun icon with rays animation</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  🌙 Dark Mode Features
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Dark gray backgrounds</li>
                  <li>• Light text for comfort</li>
                  <li>• Purple/indigo accents</li>
                  <li>• Moon icon with stars animation</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <span className="text-2xl">🎯</span>
              <div className="text-left">
                <p className="font-semibold text-blue-900 dark:text-blue-100">
                  Test Instructions:
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  1. Click the toggle in the header<br/>
                  2. Watch the smooth animation<br/>
                  3. Refresh the page to test persistence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
