import { Play, SkipBack, SkipForward } from 'lucide-react';

export function TranscriptionEditor() {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="aspect-w-16 aspect-h-9 bg-gray-50 dark:bg-[#0F172A] rounded-lg">
          <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
            Vista previa del video
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors">
            <SkipBack className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors">
            <Play className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors">
            <SkipForward className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">00:00</span>
          <div className="flex-1">
            <textarea
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-violet-500 resize-none placeholder-gray-500"
              rows={2}
              placeholder="Texto de la transcripción..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}