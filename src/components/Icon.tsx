"use client";

import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { IconData } from '@/types/types';
import Image from 'next/image';

interface IconProps {
  icon: IconData;
  onDoubleClick: () => void;
}

const Icon = ({ icon, onDoubleClick }: IconProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  
  return (
    <Draggable handle=".handle" bounds="parent" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="handle absolute top-10 left-10 w-24 h-24 flex flex-col items-center cursor-pointer"
        onDoubleClick={onDoubleClick}
      >
        <Image src={icon.iconUrl} alt={icon.title} width={48} height={48} />
        <span className="text-white text-sm text-center mt-1 px-1 py-0.5 bg-blue-900/30 rounded-sm">
          {icon.title}
        </span>
      </div>
    </Draggable>
  );
};

export default Icon;
