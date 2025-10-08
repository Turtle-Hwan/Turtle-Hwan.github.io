"use client";

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { IconData, WindowData } from '@/types/types';
import Icon from './Icon';
import Window from './Window';

// Mock Data
const initialIcons: IconData[] = [
  {
    id: 'my-computer',
    title: 'My Computer',
    iconUrl: '/icons/my-computer.png', // Placeholder path
  },
  {
    id: 'recycle-bin',
    title: 'Recycle Bin',
    iconUrl: '/icons/recycle-bin.png', // Placeholder path
  },
];

const Desktop = () => {
  const { windows, openWindow } = useAppContext();

  const handleIconDoubleClick = (icon: IconData) => {
    const windowData: WindowData = {
      id: icon.id,
      title: icon.title,
      iconUrl: icon.iconUrl,
      defaultPosition: { x: 150, y: 150 },
      defaultSize: { width: 640, height: 480 },
      children: <p>Contents of {icon.title}</p>,
    };
    openWindow(windowData);
  };

  return (
    <div className="relative w-full h-full">
      {/* Render Desktop Icons */}
      {initialIcons.map((icon) => (
        <Icon 
          key={icon.id} 
          icon={icon} 
          onDoubleClick={() => handleIconDoubleClick(icon)} 
        />
      ))}

      {/* Render Windows */}
      {windows.map((win) => (
        <Window key={win.id} window={win} />
      ))}
    </div>
  );
};

export default Desktop;
