import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface TranscriptionEditorProps {
  videoUrl: string | null;
  transcriptionId?: string;
}

interface TranscriptionResponse {
  status: 'completed' | 'error';
  text: string;
  error?: string;
  filename: string;
}

export function TranscriptionEditor({ videoUrl, transcriptionId }: TranscriptionEditorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: number | undefined;

    const checkTranscriptionStatus = async () => {
      if (!transcriptionId) return;

      try {
        console.log('Checking transcription status for:', transcriptionId);
        const response = await fetch(`http://localhost:8000/api/transcription/${transcriptionId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            console.log('Transcription not found, waiting...');
            return; // Seguimos esperando si el archivo aún no está listo
          }
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const data: TranscriptionResponse = await response.json();
        console.log('Transcription status:', data);
        
        if (data.status === 'completed' && data.text) {
          setTranscription(data.text);
          setIsLoading(false);
          setError(null);
          if (intervalId) window.clearInterval(intervalId);
        } else if (data.status === 'error') {
          setIsLoading(false);
          setError(data.error || 'Error en la transcripción');
          if (intervalId) window.clearInterval(intervalId);
        }
      } catch (err) {
        console.error('Error al verificar el estado de la transcripción:', err);
        setError(err instanceof Error ? err.message : 'Error al obtener la transcripción');
        setIsLoading(false);
        if (intervalId) window.clearInterval(intervalId);
      }
    };

    if (transcriptionId) {
      setIsLoading(true);
      setError(null);
      // Verificar el estado cada 3 segundos
      intervalId = window.setInterval(checkTranscriptionStatus, 3000);
      checkTranscriptionStatus();
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [transcriptionId]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 5
      );
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/60 dark:bg-[#1E293B] rounded-lg shadow backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="aspect-w-16 aspect-h-9 bg-white/80 dark:bg-[#0F172A] rounded-lg overflow-hidden">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
            >
              Tu navegador no soporta la reproducción de videos.
            </video>
          ) : (
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
              Vista previa del video
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-50"
            onClick={skipBackward}
            disabled={!videoUrl}
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-50"
            onClick={handlePlayPause}
            disabled={!videoUrl}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-50"
            onClick={skipForward}
            disabled={!videoUrl}
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{formatTime(currentTime)}</span>
          <div className="flex-1">
            <textarea
              className="w-full px-3 py-2 text-sm bg-white/80 dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-violet-500 resize-none placeholder-gray-500 disabled:opacity-50"
              rows={2}
              placeholder={isLoading ? "Generando transcripción..." : error || "Texto de la transcripción..."}
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}