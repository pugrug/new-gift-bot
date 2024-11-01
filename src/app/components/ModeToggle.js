'use client';

import { useMode } from '../contexts/ModeContext';

export default function ModeToggle() {
  const { currentMode, currentLevel, setMode, setLevel } = useMode();
  const isCoalMode = currentMode === 'coal';

  const getLevelEmoji = (level) => {
    switch(level) {
      case 1: return '😏';
      case 2: return '😈';
      case 3: return '👿';
      default: return '😏';
    }
  };

  return (
    <div className="flex flex-col gap-2 items-end">
      <button
        onClick={() => setMode(isCoalMode ? 'normal' : 'coal')}
        className={`
          px-4 py-2 rounded-md transition-all duration-300
          ${isCoalMode 
            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 shadow-inner' 
            : 'bg-red-600 text-white hover:bg-red-500 shadow-md hover:shadow-lg'
          }
        `}
      >
        {isCoalMode ? '🎄 Normal Mode' : '🪨 Coal Mode'}
      </button>
      
      {isCoalMode && (
        <button
          onClick={() => setLevel((currentLevel % 3) + 1)}
          className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all duration-300"
        >
          Snark Level: {currentLevel} {getLevelEmoji(currentLevel)}
        </button>
      )}
    </div>
  );
}