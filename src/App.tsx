import React from 'react';
import { Header } from './components/layout/Header';
import { VideoUploader } from './components/features/VideoUploader';
import { TranscriptionEditor } from './components/features/TranscriptionEditor';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upload Video</h2>
            <VideoUploader />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Transcription</h2>
            <TranscriptionEditor />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;