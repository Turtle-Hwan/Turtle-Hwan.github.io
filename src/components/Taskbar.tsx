"use client";

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import Image from 'next/image';

const Taskbar = () => {
  const [time, setTime] = useState('');
  const { windows } = useAppContext();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      setTime(`${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', zIndex: 9999 }}>
      {/* Top border highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#4590E5] to-[#4590E5]"></div>
      
      {/* Main taskbar */}
      <div className="h-full bg-gradient-to-b from-[#3A6EA5] via-[#4790E3] to-[#245EDC] flex items-center px-[2px]">
        
        {/* Start Button */}
        <button className="h-[36px] flex items-center justify-center rounded-r-[3px] bg-gradient-to-b from-[#5EBD3E] via-[#79C26A] to-[#419B2A] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.6),1px_1px_2px_rgba(0,0,0,0.3)] border border-[#2A5F1B] px-[6px] pr-[20px] mr-[10px] hover:from-[#6ECF4E] hover:via-[#89D27A] hover:to-[#51AB3A] active:shadow-[inset_0px_1px_2px_rgba(0,0,0,0.3)]">
          <div className="w-[24px] h-[24px] mr-[4px] bg-white/20 rounded-sm flex items-center justify-center">
            {/* Windows Flag Icon placeholder */}
            <div className="grid grid-cols-2 gap-[1px] w-[14px] h-[14px]">
              <div className="bg-red-500"></div>
              <div className="bg-green-500"></div>
              <div className="bg-blue-500"></div>
              <div className="bg-yellow-500"></div>
            </div>
          </div>
          <span className="text-white font-['Tahoma'] text-[14px] font-bold italic drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">Start</span>
        </button>

        {/* Quick Launch Separator */}
        <div className="h-[32px] w-[2px] bg-gradient-to-b from-transparent via-[#1B4276] to-transparent mr-[8px]"></div>
        
        {/* Quick Launch Area */}
        <div className="flex items-center gap-[2px] mr-[8px]">
          {/* Quick Launch Icons placeholder */}
        </div>

        {/* Task buttons separator */}
        <div className="h-[32px] w-[2px] bg-gradient-to-b from-transparent via-[#1B4276] to-transparent mr-[8px]"></div>
        
        {/* Task Buttons Area */}
        <div className="flex-1 flex items-center gap-[3px] mr-[8px] overflow-hidden">
          {windows.map((window) => (
            <button
              key={window.id}
              className="h-[28px] min-w-[160px] max-w-[200px] flex items-center px-[6px] bg-gradient-to-b from-[#5C9EDE] to-[#3B7CBF] border border-[#1B4276] rounded-[2px] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.3)] hover:from-[#6CAEDE] hover:to-[#4B8CCF] active:from-[#2B5C8F] active:to-[#1B4C7F]"
            >
              {window.iconUrl && (
                <Image 
                  src={window.iconUrl} 
                  alt="" 
                  width={16} 
                  height={16} 
                  className="mr-[4px]"
                />
              )}
              <span className="text-white text-[11px] font-['Tahoma'] truncate">
                {window.title}
              </span>
            </button>
          ))}
        </div>

        {/* System Tray Area */}
        <div className="h-[32px] bg-[#0C5AAB] rounded-[3px] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] flex items-center px-[8px] gap-[6px]">
          {/* System Icons placeholder */}
          <div className="flex items-center gap-[4px]">
            {/* Volume icon */}
            <div className="w-[16px] h-[16px] bg-white/60 rounded-sm"></div>
          </div>
          
          {/* Clock */}
          <div className="text-white text-[11px] font-['Tahoma'] min-w-[60px] text-center">
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
