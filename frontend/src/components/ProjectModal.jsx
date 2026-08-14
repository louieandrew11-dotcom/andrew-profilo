import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Sparkles, Layers } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectModal({ project, onClose }) {
  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[100000] overflow-y-auto bg-[#030305]/95 backdrop-blur-3xl flex justify-center items-start pt-16 sm:pt-24 pb-16 px-4 sm:px-6 md:px-10 animate-fadeIn overscroll-contain"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl glass-panel rounded-3xl border border-amber-500/25 p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.9)] space-y-8 my-auto">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Project Modal"
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white border border-white/20 transition-all duration-300 shadow-xl group"
        >
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        </button>

        {/* Modal Top Metadata & Header */}
        <div className="pr-12 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{project.number} // FEATURED CASE STUDY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif uppercase tracking-tight text-white text-glow leading-none pt-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-emerald-400 font-mono font-medium pt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Image Preview Banner */}
        <div className="relative aspect-video rounded-2xl overflow-hidden glass-panel border border-white/15 group shadow-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-70" />
        </div>

        {/* Description & Tech Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Project Overview &amp; Architecture</span>
            </h3>
            <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed font-light">
              {project.fullDescription || project.description}
            </p>

            {/* Key Features List */}
            {project.features && (
              <div className="space-y-3 pt-4">
                <h4 className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                  Key System Capabilities:
                </h4>
                <ul className="space-y-2">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="md:col-span-5 space-y-6 glass-card p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/[0.03]">
            <div>
              <h4 className="text-xs font-mono text-white/50 tracking-widest uppercase mb-4 flex items-center gap-2 font-bold">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>TECHNOLOGY STACK</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal CTA Buttons */}
            <div className="flex flex-col space-y-3 pt-6 border-t border-white/10">
              <a
                href={project.liveUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg"
              >
                <span>LAUNCH LIVE DEMO</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-xl glass-button text-white font-bold text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 hover:border-amber-400"
              >
                <span>INSPECT REPOSITORY</span>
                <GithubIcon className="w-4 h-4 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
