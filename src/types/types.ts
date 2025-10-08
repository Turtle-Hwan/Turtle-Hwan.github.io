import React from 'react';

export interface IconData {
  id: string;
  title: string;
  iconUrl: string;
  initialPosition?: { x: number; y: number };
}

export interface WindowData {
  id: string;
  title: string;
  iconUrl: string;
  children: React.ReactNode;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
}
