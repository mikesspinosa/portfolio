export const isMobile = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // Default to false during server-side rendering
  }
  
  const ua = window.navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
};
