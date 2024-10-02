"use client"
import { useState, useEffect } from 'react';

// Define your screen size breakpoints (similar to TailwindCSS)
const breakpoints = {
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

const getDeviceSize = (width) => {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  return 'sm'; // Default for smaller screens
};

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getDeviceSize(typeof window !== "undefined" ? window.innerWidth : 0));

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getDeviceSize(typeof window !== "undefined" ? window.innerWidth : 0));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};
