import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer({ lenis }) {
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full py-12 px-6 md:px-12 lg:px-20 bg-[#030305] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
        {/* Left Brand Mark */}
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-xl glass-panel border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest">
            &lt; ani /&gt;
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-serif font-black tracking-wider text-white uppercase">
              LOUIE ANDREW S
            </span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
              © 2026 CREATIVE DEVELOPER PORTFOLIO
            </span>
          </div>
        </div>

        {/* Center Tag */}
        <div className="text-xs font-mono text-white/50 flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          <span>using React, GSAP &amp; Python Flask</span>
        </div>

        {/* Right Back to Top Action */}
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="p-4 rounded-full glass-panel border border-amber-500/30 text-amber-400 hover:text-black hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 shadow-xl group"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  );
}
