import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { VideoUploader } from './components/features/VideoUploader';
import { TranscriptionEditor } from './components/features/TranscriptionEditor';

function App() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [transcriptionId, setTranscriptionId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors">
      <Header />
      <main className="container mx-auto px-3 py-4 max-w-[390px] sm:max-w-3xl sm:px-6">
        <div className="space-y-4">
          <section>
            <h2 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">Subir Video</h2>
            <VideoUploader 
              onVideoSelect={setVideoUrl} 
              onTranscriptionStart={setTranscriptionId}
            />
          </section>
          
          <section>
            <h2 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">Transcripción</h2>
            <TranscriptionEditor 
              videoUrl={videoUrl} 
              transcriptionId={transcriptionId || undefined}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;