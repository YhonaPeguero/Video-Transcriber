import React, { useCallback, useRef, useState } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';

interface VideoUploaderProps {
  onVideoSelect: (url: string | null) => void;
  onTranscriptionStart: (transcriptionId: string) => void;
}

type NotificationStatus = {
  type: 'success' | 'error';
  message: string;
} | null;

export function VideoUploader({ onVideoSelect, onTranscriptionStart }: VideoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<NotificationStatus>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadToServer = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:8000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al subir el video');
    }

    const data = await response.json();
    return data.filename;
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    
    const file = files[0];
    if (!file) return;

    const validTypes = ['video/mp4', 'video/avi', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      setNotification({
        type: 'error',
        message: 'Por favor selecciona un archivo de video válido (MP4, AVI, o MOV)'
      });
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      setNotification({
        type: 'error',
        message: 'El archivo debe ser menor a 500MB'
      });
      return;
    }

    try {
      setIsLoading(true);
      setNotification(null);

      // Crear URL para la vista previa del video
      const videoUrl = URL.createObjectURL(file);
      onVideoSelect(videoUrl);
      
      // Subir el video al servidor y obtener el ID de transcripción
      const transcriptionId = await uploadToServer(file);
      onTranscriptionStart(transcriptionId);

      setNotification({
        type: 'success',
        message: '¡Video cargado exitosamente! Iniciando transcripción...'
      });

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error al procesar el video';
      setNotification({
        type: 'error',
        message: errorMessage
      });
      onVideoSelect(null);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  }, [onVideoSelect, onTranscriptionStart]);

  return (
    <div className="space-y-4">
      <div
        className={`bg-white/60 dark:bg-[#1E293B] rounded-lg p-8 text-center shadow backdrop-blur-sm ${
          isLoading ? 'opacity-50 pointer-events-none' : ''
        }`}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="video/mp4,video/avi,video/quicktime"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={isLoading}
        />
        <div className="flex flex-col items-center space-y-3">
          <Upload className="h-6 w-6 text-violet-600 dark:text-violet-500" />
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {isLoading ? 'Procesando video...' : 'Arrastra tu video aquí'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">MP4, AVI, MOV hasta 500MB</p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="mt-2 px-4 py-1.5 text-xs font-medium rounded-md bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Procesando...' : 'Seleccionar Archivo'}
          </button>
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-lg flex items-center space-x-2 ${
            notification.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          }`}
        >
          {notification.type === 'success' ? (
            <Check className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <p className="text-sm">{notification.message}</p>
        </div>
      )}
    </div>
  );
}