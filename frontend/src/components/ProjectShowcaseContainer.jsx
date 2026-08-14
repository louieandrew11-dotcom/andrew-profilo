import React, { useEffect, useState } from 'react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
  Globe,
} from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectShowcaseContainer({
  project,
  projectsList = [],
  onClose,
  onSelectProject,
}) {
  const [activeTab, setActiveTab] = useState('overview');

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

  if (!project || typeof project !== 'object') return null;

  const validProjects = Array.isArray(projectsList) && projectsList.length > 0 ? projectsList : [project];
  const currentIndex = validProjects.findIndex((p) => p && p.number === project.number);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  
  const prevProject = validProjects[(safeIndex - 1 + validProjects.length) % validProjects.length];
  const nextProject = validProjects[(safeIndex + 1) % validProjects.length];

  const handleSelectPrev = (e) => {
    if (e) e.stopPropagation();
    if (prevProject && onSelectProject) onSelectProject(prevProject);
  };

  const handleSelectNext = (e) => {
    if (e) e.stopPropagation();
    if (nextProject && onSelectProject) onSelectProject(nextProject);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    if (onClose) onClose();
  };

  const tags = Array.isArray(project.tags) ? project.tags : [];
  const features = Array.isArray(project.features) ? project.features : [];

  return (
    <div
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[999999] bg-[#030305] text-white overflow-y-auto animate-fadeIn overscroll-contain"
    >
      {/* Film Grain Background */}
      <div className="grain-overlay" />

      {/* TOP FIXED NAVIGATION HEADER BAR */}
      <header className="sticky top-0 z-50 w-full glass-nav border-b border-amber-500/20 px-6 py-4 flex items-center justify-between shadow-2xl">
        {/* Back Button */}
        <button
          onClick={handleClose}
          className="flex items-center space-x-2 text-xs font-mono tracking-widest text-white/80 hover:text-amber-400 transition-colors group"
        >
          <div className="p-2 rounded-full glass-panel group-hover:bg-amber-400 group-hover:text-black transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">RETURN TO PORTFOLIO</span>
        </button>

        {/* Center Project Counter */}
        <div className="flex items-center space-x-3 text-xs font-mono tracking-widest text-amber-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>SHOWCASE // {safeIndex + 1} OF {validProjects.length}</span>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSelectPrev}
            title="Previous Project"
            className="p-2 rounded-full glass-panel hover:border-amber-400 text-white/70 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleSelectNext}
            title="Next Project"
            className="p-2 rounded-full glass-panel hover:border-amber-400 text-white/70 hover:text-amber-300 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white transition-all ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12 z-10 relative">
        {/* HERO TITLE CONTAINER */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{project.number || 'PROJECT'} // FULL-STACK CASE STUDY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-400 drop-shadow-[0_0_40px_rgba(245,158,11,0.3)]">
            {project.title || 'UNTITLED PROJECT'}
          </h1>

          <p className="text-base sm:text-xl font-mono text-emerald-400 tracking-wide font-medium">
            {project.subtitle || ''}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-bold text-xs font-mono tracking-widest uppercase flex items-center gap-2 hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all"
              >
                <span>LAUNCH LIVE DEMO</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full glass-button text-white font-bold text-xs font-mono tracking-widest uppercase flex items-center gap-2 hover:border-amber-400"
              >
                <span>VIEW SOURCE CODE</span>
                <GithubIcon className="w-4 h-4 text-amber-400" />
              </a>
            )}
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-400 text-black font-bold shadow-lg'
                : 'glass-panel text-white/70 hover:text-white'
            }`}
          >
            OVERVIEW &amp; ARCHITECTURE
          </button>
          <button
            onClick={() => setActiveTab('mockup')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all ${
              activeTab === 'mockup'
                ? 'bg-amber-400 text-black font-bold shadow-lg'
                : 'glass-panel text-white/70 hover:text-white'
            }`}
          >
            INTERACTIVE MOCKUP
          </button>
        </div>

        {/* TAB CONTENT: INTERACTIVE MOCKUP BROWSER SCREEN CONTAINER */}
        <div className="relative w-full glass-panel rounded-3xl border border-amber-500/20 p-4 sm:p-6 shadow-2xl overflow-hidden">
          {/* Browser Chrome Header */}
          <div className="w-full flex items-center justify-between bg-[#08080c] px-4 py-3 rounded-2xl border border-white/10 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="px-6 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/50 w-full max-w-md text-center truncate">
              https://{(project.title || 'project').toLowerCase().replace(/[^a-z0-9]/g, '')}.dev
            </div>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>

          {/* Screenshot Display Frame */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
            <img
              src={project.image || ''}
              alt={project.title || 'Project Preview'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-40" />
          </div>
        </div>

        {/* 2-COLUMN NARRATIVE & TECH SPECS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <span>System Architecture Narrative</span>
              </h3>
              <p className="text-base text-white/80 font-sans leading-relaxed font-light">
                {project.fullDescription || project.description || 'Project details loading.'}
              </p>
            </div>

            {/* Key System Capabilities Checklist */}
            {features.length > 0 && (
              <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4">
                <h4 className="text-xs font-mono text-amber-400 tracking-widest uppercase font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Key Features &amp; Performance Metrics</span>
                </h4>
                <ul className="space-y-3">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-white/80">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Technology Badges & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
              <h4 className="text-xs font-mono text-white/40 tracking-widest uppercase font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>TECHNICAL STACK &amp; TOOLING</span>
              </h4>

              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <span className="text-xs font-mono text-emerald-400 block font-bold">
                  DEVELOPER NOTE // LOUIE ANDREW S
                </span>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  Engineered with scalable clean architecture, responsive layout mathematics, and high performance rendering pipelines.
                </p>
              </div>
            </div>

            {/* Bottom Switching Navigation Footer inside Container */}
            <div className="flex items-center justify-between p-6 rounded-3xl glass-panel border border-white/10">
              <button
                onClick={handleSelectPrev}
                className="text-xs font-mono text-white/70 hover:text-amber-400 flex items-center space-x-2 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>PREV: {prevProject ? prevProject.number : 'PROJECT'}</span>
              </button>

              <button
                onClick={handleSelectNext}
                className="text-xs font-mono text-white/70 hover:text-amber-400 flex items-center space-x-2 group"
              >
                <span>NEXT: {nextProject ? nextProject.number : 'PROJECT'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
