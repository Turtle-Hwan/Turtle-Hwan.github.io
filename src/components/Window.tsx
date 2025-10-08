"use client";

import React from 'react';
import Draggable from 'react-draggable';
import { useAppContext } from '@/contexts/AppContext';
import { WindowData } from '@/types/types';
import Image from 'next/image';

// This combines the base WindowData with the stateful properties
interface WindowProps {
  window: WindowData & { 
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number; 
  };
}

const Window = ({ window }: WindowProps) => {
  const { closeWindow, focusWindow } = useAppContext();

  return (
    <Draggable
      handle=".window-header"
      bounds="parent"
      defaultPosition={window.position}
      onStart={() => focusWindow(window.id)}
    >
      <div
        className="absolute bg-[#ece9d8] border border-[#d4d0c8] rounded-md shadow-lg"
        style={{ 
          width: window.size.width, 
          height: window.size.height,
          zIndex: window.zIndex,
        }}
      >
        {/* Window Header */}
        <div className="window-header h-7 bg-gradient-to-b from-[#0058ee] to-[#357cff] flex items-center justify-between px-1 rounded-t-md cursor-pointer">
          <div className="flex items-center gap-1">
            <Image src={window.iconUrl} alt={window.title} width={16} height={16} />
            <h2 className="text-white font-bold text-sm">{window.title}</h2>
          </div>
          {/* Control Buttons */}
          <div className="flex items-center">
            <button 
              onClick={() => closeWindow(window.id)}
              className="w-5 h-5 bg-[#e14344] border border-white/50 rounded-sm text-white font-bold flex items-center justify-center text-xs shadow-md"
            >
              X
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-1 h-[calc(100%-28px)]">
          <div className="bg-white w-full h-full border border-gray-400">
            {window.children}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
