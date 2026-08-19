import React, { useEffect } from 'react';
import { X, Sparkles, Tag, Calendar, MapPin } from 'lucide-react';

export default function ImageInfoModal({ item, onClose }) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  return (
    <div
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[999999] bg-[#030305]/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn overflow-y-auto overscroll-contain"
    >
      {/* Container */}
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-amber-500/30 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] space-y-6 my-auto">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Info Modal"
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white border border-white/20 transition-all duration-300 shadow-xl group"
        >
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        </button>

        {/* Top Tag & Title */}
        <div className="pr-12 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{item.category || 'VISUAL ASSET // INFO'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif uppercase tracking-tight text-white text-glow leading-none pt-1">
            {item.title || 'VISUAL ASSET'}
          </h2>
        </div>

        {/* Image Preview Window */}
        <div className="relative aspect-video max-h-[55vh] rounded-2xl overflow-hidden glass-card border border-white/15 shadow-2xl group">
          <img
            src={item.src || item.image}
            alt={item.title || 'Image Preview'}
            className="w-full h-full object-contain bg-black/40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-40" />
        </div>

        {/* Narrative & Details Breakdown */}
        <div className="space-y-4 pt-2 border-t border-white/10">
          <p className="text-sm sm:text-base text-white/80 font-sans font-light leading-relaxed">
            {item.description || item.fullDescription || `${item.title} — High-resolution digital artwork & interactive visual asset crafted for Louie Andrew S's developer portfolio.`}
          </p>

          {/* Tags & Metadata Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
              <Tag className="w-3.5 h-3.5" />
              <span>{item.category || 'Creative Technology'}</span>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-amber-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>Chennai, India</span>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/60">
              <Calendar className="w-3.5 h-3.5" />
              <span>2026 EDITION</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-bold text-xs font-mono tracking-widest uppercase hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all"
          >
            CLOSE INFORMATION
          </button>
        </div>
      </div>
    </div>
  );
}
