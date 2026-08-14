import React, { useState } from 'react';

export default function KineticTypography() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const words = [
    { text: 'WEB', category: 'FULL-STACK DEVELOPMENT', image: '/assets/project_ani_apple_store.png', color: 'from-cyan-400 to-blue-500' },
    { text: 'ANIMATION', category: 'GSAP & LENIS INERTIA', image: '/assets/gallery_3.svg', color: 'from-purple-400 to-pink-500' },
    { text: 'PYTHON', category: 'FLASK & ALGORITHMS', image: '/assets/project_skillforge.svg', color: 'from-emerald-400 to-teal-500' },
    { text: 'AI', category: 'MACHINE LEARNING & BOTS', image: '/assets/project_discord.svg', color: 'from-indigo-400 to-cyan-400' },
    { text: 'DESIGN', category: 'DARK LUXURY UI/UX', image: '/assets/gallery_1.svg', color: 'from-rose-400 to-amber-500' },
    { text: 'INTERACTIVE', category: '3D MOUSE PARALLAX', image: '/assets/project_portfolio.svg', color: 'from-purple-500 to-indigo-600' },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full py-32 px-6 md:px-12 lg:px-20 bg-[#050507] overflow-hidden border-t border-white/5 select-none"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Tag */}
        <div className="mb-12">
          <span className="text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase block">
            // 05. CORE DISCIPLINES
          </span>
        </div>

        {/* Oversized Kinetic Words List */}
        <div className="space-y-4">
          {words.map((word, idx) => (
            <div
              key={word.text}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group cursor-pointer border-b border-white/10 pb-4 transition-colors duration-500 hover:border-white/40"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <h3
                  className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif uppercase tracking-tighter transition-all duration-500 ${
                    hoveredIndex === idx
                      ? `text-transparent bg-clip-text bg-gradient-to-r ${word.color} scale-105 translate-x-4`
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {word.text}
                </h3>
                <span className="text-xs font-mono tracking-widest text-white/50 group-hover:text-cyan-300 transition-colors uppercase pt-2 md:pt-0">
                  {word.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Mouse-Following Preview Image Reveal */}
        {hoveredIndex !== null && (
          <div
            className="pointer-events-none fixed z-50 w-72 h-48 rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-2xl transition-all duration-200 ease-out transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          >
            <img
              src={words[hoveredIndex].image}
              alt={words[hoveredIndex].text}
              className="w-full h-full object-cover animate-pulse"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                {words[hoveredIndex].text} // {words[hoveredIndex].category}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
