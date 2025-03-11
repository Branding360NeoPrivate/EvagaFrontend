import React, { useEffect } from 'react';

function GlobalEventHandlers({ children }) {
  useEffect(() => {
    const preventScroll = (e) => {
      if (e.target.type === 'number') {
        e.preventDefault();
      }
    };

    const preventArrowKeys = (e) => {
      if (
        e.target.type === 'number' &&
        (e.key === 'ArrowUp' || e.key === 'ArrowDown')
      ) {
        e.preventDefault();
      }
    };


    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('keydown', preventArrowKeys);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('keydown', preventArrowKeys);
    };
  }, []);

  return <>{children}</>;
}

export default GlobalEventHandlers;
