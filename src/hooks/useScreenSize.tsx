import { useEffect, useState } from 'react';

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    function handleResize() {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}
