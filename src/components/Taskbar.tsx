"use client";

import React, { useState, useEffect } from 'react';

const Taskbar = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-gradient-to-b from-[#245edc] to-[#3b82f6] flex items-center justify-between px-1 z-[1000]">
      {/* Start Button */}
      <button className="h-[24px] flex items-center justify-center rounded-md bg-gradient-to-b from-[#79c26a] to-[#3a942a] shadow-md border border-black/20 px-2 pr-4 text-white font-bold italic text-lg">
        <span className="drop-shadow-sm">start</span>
      </button>

      {/* Clock */}
      <div className="h-[24px] flex items-center bg-blue-400/50 border border-black/20 px-2 text-white text-xs">
        {time}
      </div>
    </div>
  );
};

export default Taskbar;
