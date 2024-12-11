import React from 'react';
import { VideoIcon } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <VideoIcon className="h-8 w-8 text-violet-600 dark:text-violet-400" />
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">Video Transcriber</span>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                History
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}