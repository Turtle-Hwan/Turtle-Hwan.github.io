"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { WindowData } from '@/types/types';

// == TYPES ==
interface WindowState extends WindowData {
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
}

interface AppContextType {
  windows: WindowState[];
  openWindow: (windowData: WindowData) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
}

// == CONTEXT ==
const AppContext = createContext<AppContextType | undefined>(undefined);

// == PROVIDER ==
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100); // Base z-index

  const openWindow = (windowData: WindowData) => {
    // Prevent opening the same window multiple times
    if (windows.some(win => win.id === windowData.id)) {
      focusWindow(windowData.id);
      return;
    }

    const newWindow: WindowState = {
      ...windowData,
      position: windowData.defaultPosition,
      size: windowData.defaultSize,
      zIndex: nextZIndex,
      isMinimized: false,
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(win => win.id !== id));
  };

  const focusWindow = (id: string) => {
    if (windows.find(win => win.id === id)?.zIndex === nextZIndex - 1) {
      return; // Already focused
    }

    const newZIndex = nextZIndex;
    setNextZIndex(prev => prev + 1);

    setWindows(prev =>
      prev.map(win =>
        win.id === id ? { ...win, zIndex: newZIndex } : win
      )
    );
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev =>
      prev.map(win =>
        win.id === id ? { ...win, position } : win
      )
    );
  };

  return (
    <AppContext.Provider value={{ windows, openWindow, closeWindow, focusWindow, updateWindowPosition }}>
      {children}
    </AppContext.Provider>
  );
};

// == HOOK ==
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
