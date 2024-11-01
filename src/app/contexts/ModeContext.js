'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  normal: {
    primary: '#ff0000',    // Bright Christmas red
    secondary: '#00ff00',  // Bright Christmas green
    background: '#ffffff', // Snow white
    text: '#000000',      // Classic black
    accent: '#ffd700'     // Gold for sparkle
  },
  coal: {
    primary: '#8b0000',    // Dark red
    secondary: '#006400',  // Dark green
    background: '#222222', // Dark grey
    text: '#cccccc',      // Light grey
    accent: '#444444'     // Coal color
  }
};

const ModeContext = createContext();

export function ModeProvider({ children }) {
  const [currentMode, setCurrentMode] = useState('normal');
  const [currentLevel, setCurrentLevel] = useState(1);

  // Update CSS variables when mode changes
  useEffect(() => {
    const theme = themes[currentMode];
    if (theme) {
      Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value);
      });
    }
  }, [currentMode]);

  const value = {
    currentMode,
    currentLevel,
    setMode: (mode) => {
      if (themes[mode]) {
        setCurrentMode(mode);
      }
    },
    setLevel: (level) => {
      if ([1, 2, 3].includes(level)) {
        setCurrentLevel(level);
      }
    },
    getCurrentTheme: () => themes[currentMode]
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}