import { useState, useEffect } from 'react';

function useWindowDimensions() {
  const isClient = typeof window === 'object'; // Check if window object is available

  const [windowDimensions, setWindowDimensions] = useState({
    windowWidth: isClient ? window.innerWidth : undefined,
    windowHeight: isClient ? window.innerHeight : undefined
  });

  useEffect((): any => {
    if (!isClient) return false; // If running on server, do nothing

    function handleResize() {
      setWindowDimensions({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  return windowDimensions;
}

export default useWindowDimensions;
