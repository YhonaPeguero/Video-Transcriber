import React, { useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';

export function VideoUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const file = files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['video/mp4', 'video/avi', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid video file (MP4, AVI, or MOV)');
      return;
    }

    // Validate file size (500MB = 500 * 1024 * 1024 bytes)
    if (file.size > 500 * 1024 * 1024) {
      alert('File size must be less than 500MB');
      return;
    }

    // Handle the valid file
    console.log('Processing file:', file.name);
    // Add your file processing logic here
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  }, []);

  return (
    <div
      className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center hover:border-violet-500 dark:hover:border-violet-400 transition-colors duration-200 bg-white dark:bg-gray-800"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="video/mp4,video/avi,video/quicktime"
        onChange={(e) => handleFileSelect(e.target.files)}
      />
      <div className="flex flex-col items-center">
        <Upload className="h-12 w-12 text-violet-500 dark:text-violet-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Drop your video here</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Supports MP4, AVI, MOV up to 500MB
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 dark:focus:ring-offset-gray-800 transition-colors"
        >
          Select File
        </button>
      </div>
    </div>
  );
}