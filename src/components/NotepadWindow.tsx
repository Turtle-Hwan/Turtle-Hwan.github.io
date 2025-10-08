"use client";

import React, { useState } from 'react';

const NotepadWindow = () => {
  const [text, setText] = useState('');

  return (
    <div className="flex flex-col h-full">
      {/* Menu Bar */}
      <div className="bg-[#f1f1f1] border-b border-gray-400 px-2 py-1">
        <div className="flex gap-4 text-xs">
          <span className="font-bold">File</span>
          <span className="font-bold">Edit</span>
          <span className="font-bold">Format</span>
          <span className="font-bold">View</span>
          <span className="font-bold">Help</span>
        </div>
      </div>

      {/* Text Editor */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 w-full p-2 border-0 resize-none focus:outline-none font-mono text-sm"
        placeholder="Type your text here..."
        spellCheck={false}
      />
    </div>
  );
};

export default NotepadWindow;
