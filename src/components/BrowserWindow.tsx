"use client";

import React, { useState } from 'react';

const BrowserWindow = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [inputValue, setInputValue] = useState('https://www.google.com');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let newUrl = inputValue.trim();

    // Add https:// if no protocol is specified
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      newUrl = 'https://' + newUrl;
    }

    setUrl(newUrl);
    setInputValue(newUrl);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Address Bar */}
      <div className="bg-[#f1f1f1] border-b border-gray-400 p-2">
        <form onSubmit={handleNavigate} className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">Address:</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-400 text-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter URL"
          />
          <button
            type="submit"
            className="px-4 py-1 bg-[#ece9d8] border border-gray-400 text-sm hover:bg-gray-200 active:border-gray-600"
          >
            Go
          </button>
        </form>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white">
        <iframe
          src={url}
          className="w-full h-full border-0"
          title="Browser Content"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    </div>
  );
};

export default BrowserWindow;
