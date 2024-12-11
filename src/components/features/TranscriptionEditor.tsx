import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

export function TranscriptionEditor() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-900 rounded-lg">
          {/* Video player will go here */}
          <div className="flex items-center justify-center text-gray-400 dark:text-gray-500">
            Video Preview
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
            <SkipBack className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
            <Play className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">00:00</span>
            <div className="flex-1">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition-colors"
                rows={2}
                placeholder="Transcription text..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}