import React, { useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';

export function VideoUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const file = files[0];
    if (!file) return;

    const validTypes = ['video/mp4', 'video/avi', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor selecciona un archivo de video válido (MP4, AVI, o MOV)');
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      alert('El archivo debe ser menor a 500MB');
      return;
    }

    console.log('Procesando archivo:', file.name);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  }, []);

  return (
    <div
      className="bg-white/60 dark:bg-[#1E293B] rounded-lg p-8 text-center shadow backdrop-blur-sm"
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
      <div className="flex flex-col items-center space-y-3">
        <Upload className="h-6 w-6 text-violet-600 dark:text-violet-500" />
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Arrastra tu video aquí</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">MP4, AVI, MOV hasta 500MB</p>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 px-4 py-1.5 text-xs font-medium rounded-md bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white transition-colors"
        >
          Seleccionar Archivo
        </button>
      </div>
    </div>
  );
}