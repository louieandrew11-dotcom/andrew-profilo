import React from 'react';
import { ArrowUp, Heart, Mail, ExternalLink, Terminal, Sparkles } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer({ lenis }) {
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'SELECTED WORK', href: '#projects' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const flagshipProjects = [
    { name: 'Ani Apple Store (Siri AI)', href: 'https://apple-ai-mu.vercel.app/' },
    { name: 'SkillForge Platform', href: 'https://github.com/louieandrew11-dotcom/skillforge-platform' },
    { name: 'SleepyGo Hotel Booking', href: 'https://sleep-go.vercel.app/' },
    { name: 'Discord Bot Engine', href: 'https://github.com/louieandrew/discord-bot-system' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/louieandrew11-dotcom' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/ig_andrew__11_/?hl=en' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/louieandrew11/' },
    { name: 'Email', icon: Mail, href: 'mailto:louieandrew.dev@gmail.com' },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: -20 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer className="relative w-full bg-[#020204] text-white border-t border-white/10 overflow-hidden pt-20 pb-12 px-6 md:px-12 lg:px-20 font-sans">
      {/* Background Liquid Ambient Spotlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Top Header & Brand Banner */}
        <div className="liquid-glass rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-white/10 shadow-2xl">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs tracking-widest uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>&lt; LOUIE ANDREW S /&gt;</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight uppercase text-white text-glow">
              LET'S BUILD SOMETHING <span className="text-outline-gold">EXTRAORDINARY</span>
            </h2>

            <p className="text-sm font-sans text-white/70 font-light leading-relaxed">
              Creative Developer &amp; Computer Science Engineering student crafting high-performance web experiences with React, Python Flask, GSAP motion physics, and AI integrations.
            </p>
          </div>

          {/* Quick Contact CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-extrabold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <span>START A PROJECT</span>
              <Terminal className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="p-4 rounded-full liquid-glass border border-amber-500/40 text-amber-300 hover:text-black hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 flex items-center justify-center group shadow-xl"
            >
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* 4-Column Navigation & Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-4">
          {/* Column 1: Identity */}
          <div className="space-y-4">
            <h3 className="text-sm font-serif font-black tracking-widest uppercase text-white text-glow">
              LOUIE ANDREW S
            </h3>
            <p className="text-xs font-sans text-white/60 leading-relaxed font-light">
              B.E. Computer Science Engineering (2024–2028)<br />
              St. Joseph's College of Engineering, Chennai.<br />
              Specializing in Full-Stack Web &amp; AI Systems.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OPEN FOR FREELANCE &amp; HIRING</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-amber-400 tracking-[0.2em] uppercase font-bold">
              // NAVIGATION
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xs font-mono text-white/70 hover:text-amber-300 tracking-wider uppercase transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Flagship Projects */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase font-bold">
              // FEATURED BUILDS
            </h4>
            <ul className="space-y-2.5">
              {flagshipProjects.map((proj) => (
                <li key={proj.name}>
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white/70 hover:text-cyan-300 tracking-wider uppercase transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{proj.name}</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400/70" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Connections */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-emerald-400 tracking-[0.2em] uppercase font-bold">
              // CONNECT
            </h4>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((soc) => {
                const IconComponent = soc.icon;
                return (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl liquid-glass border border-white/10 hover:border-amber-400/60 text-xs font-mono text-white/80 hover:text-amber-300 tracking-wider uppercase flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span>{soc.name}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span>© 2026 LOUIE ANDREW S</span>
            <span>•</span>
            <span className="text-amber-400/80">CREATIVE DEVELOPER PORTFOLIO</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>using React, GSAP &amp; Python Flask</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
