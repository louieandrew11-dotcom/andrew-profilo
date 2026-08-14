import React, { useEffect, useState } from 'react';

export default function CustomCursor({ cursorText }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('label') ||
        target.closest('.interactive-hover') ||
        target.closest('[data-cursor]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  if (!isVisible || window.innerWidth < 1024) return null;

  return (
    <>
      {/* Outer Magnetic Ring with Ultra High z-[1000000] */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[1000000] rounded-full border border-white/40 flex items-center justify-center transition-transform duration-150 ease-out ${
          cursorText
            ? 'w-24 h-24 bg-white/10 backdrop-blur-md border-amber-400/80 scale-100'
            : isHovered
            ? 'w-16 h-16 bg-amber-400/15 border-amber-400/80 scale-125 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
            : 'w-8 h-8 scale-100'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorText && (
          <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-amber-300 text-center px-2">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Glowing Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-amber-400 rounded-full pointer-events-none z-[1000000] transition-transform duration-75 ease-out shadow-[0_0_12px_#f59e0b]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
