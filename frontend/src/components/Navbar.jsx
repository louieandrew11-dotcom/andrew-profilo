import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Sparkles, Terminal } from 'lucide-react';

export default function Navbar({ lenis }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'WORK', href: '#projects' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -20 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 glass-nav border-b border-amber-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Badge */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center space-x-2.5 group cursor-pointer"
        >
          <div className="px-3 py-1.5 rounded-xl glass-panel border border-amber-500/40 text-amber-300 font-mono text-xs tracking-widest font-extrabold uppercase flex items-center gap-2 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="group-hover:text-emerald-400 transition-colors">&lt; LOUIE ANDREW S /&gt;</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-serif font-black tracking-widest uppercase text-white group-hover:text-amber-300 transition-colors">
              LOUIE ANDREW S
            </span>
            <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase">
              CREATIVE DEV
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-mono text-white/70 hover:text-amber-300 tracking-widest uppercase transition-all duration-300 relative py-1 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-emerald-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Button CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-extrabold text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>HIRE ME</span>
            <Terminal className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2.5 rounded-xl glass-panel text-white hover:text-amber-400 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-[#030305]/95 backdrop-blur-3xl border-b border-white/10 p-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-mono text-white/90 hover:text-amber-400 tracking-widest uppercase transition-colors py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-bold text-xs font-mono tracking-widest uppercase text-center block"
          >
            HIRE LOUIE ANDREW S
          </a>
        </div>
      )}
    </header>
  );
}
