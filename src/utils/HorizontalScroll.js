import React, { useRef } from 'react';
// import './HorizontalScroll.css';

const HorizontalScroll = ({ children, className = '', speed = 2 }) => {
  const containerRef = useRef(null);
  let isDragging = false;
  let startX, scrollLeft;

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * speed; 
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  return (
    <div
      ref={containerRef}
      className={`horizontal-scroll-container ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;
