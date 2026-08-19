import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, Terminal, Mail, MessageSquare, Bot } from 'lucide-react';
import ImageInfoModal from './ImageInfoModal';

gsap.registerPlugin(ScrollTrigger);

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

export default function Hero({ mousePos }) {
  const heroRef = useRef(null);
  const headingLouieRef = useRef(null);
  const headingAndrewRef = useRef(null);
  const subTitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialLogosRef = useRef(null);
  const profileContainerRef = useRef(null);
  const glassCircleRef = useRef(null);
  const glowRef = useRef(null);
  const decorRef = useRef(null);
  
  const [selectedPhotoInfo, setSelectedPhotoInfo] = useState(null);

  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  const offsetX = (mousePos.x / windowWidth - 0.5);
  const offsetY = (mousePos.y / windowHeight - 0.5);

  const heroSocials = [
    { name: 'GitHub', url: 'https://github.com/louieandrew11-dotcom', icon: GithubIcon },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/louieandrew11/', icon: LinkedinIcon },
    { name: 'Instagram', url: 'https://www.instagram.com/ig_andrew__11_/?hl=en', icon: InstagramIcon },
    { name: 'Discord', url: 'https://discord.com', icon: MessageSquare },
    { name: 'Email', url: 'mailto:louieandrew11@gmail.com', icon: Mail },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });

      tl.fromTo(
        headingLouieRef.current,
        { y: 80, filter: 'blur(20px)', opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { y: 0, filter: 'blur(0px)', opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', delay: 0.2 }
      )
        .fromTo(
          headingAndrewRef.current,
          { y: 80, filter: 'blur(20px)', opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
          { y: 0, filter: 'blur(0px)', opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
          '-=1.0'
        )
        .fromTo(
          subTitleRef.current,
          { y: 30, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.0 },
          '-=0.8'
        )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          buttonsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          socialLogosRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          profileContainerRef.current,
          { x: 100, opacity: 0, scale: 0.9, filter: 'blur(15px)' },
          { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' },
          '-=1.4'
        );

      gsap.to([headingLouieRef.current, headingAndrewRef.current, subTitleRef.current], {
        scale: 0.85,
        opacity: 0.3,
        y: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(profileContainerRef.current, {
        scale: 1.12,
        y: -80,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handlePhotoClick = () => {
    setSelectedPhotoInfo({
      title: 'Louie Andrew S — Creative Developer',
      category: 'CREATIVE PROFILE PORTRAIT',
      src: '/assets/louie_photo.jpg',
      description: 'Louie Andrew S is a B.E. Computer Science Engineering student and Creative Developer based in Chennai, India. Specializing in high-performance web applications, modern React architecture, GSAP 3D motion graphics, and Python Flask REST APIs.',
    });
  };

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden bg-[#000000] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))] border-b border-white/5"
      >
        {/* AMBIENT BACKGROUND DARK GLOW LIGHTS */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* ANIMATED BACKGROUND IMAGE TEXTURE */}
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden z-0">
          <img
            src="/assets/bg_cyber_grid.png"
            alt="Animated Background Cyber Grid"
            className="w-full h-full object-cover filter contrast-125 brightness-90 scale-105 animate-pulse-slow mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-[#000000]" />
        </div>
        {/* 3D Virtual Camera Container */}
        <div
          className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8 z-10 transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${-offsetX * 25}px, ${-offsetY * 25}px, 0)`,
          }}
        >
          {/* LEFT COLUMN: Oversized Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            {/* Tag badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border-amber-500/40 text-amber-300 text-xs font-mono tracking-widest uppercase w-fit">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Full-Stack &amp; Creative Technology</span>
            </div>

            {/* Enormous Editorial Headings */}
            <div className="space-y-0 leading-none tracking-tighter uppercase font-serif select-none">
              <div className="overflow-hidden py-1">
                <h1
                  ref={headingLouieRef}
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-white text-glow inline-block"
                >
                  LOUIE
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1
                  ref={headingAndrewRef}
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-400 inline-block drop-shadow-[0_0_40px_rgba(245,158,11,0.3)]"
                >
                  ANDREW
                </h1>
              </div>
            </div>

            {/* Subtitle */}
            <div ref={subTitleRef} className="pt-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase">
                CREATIVE DEVELOPER
              </h2>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-white/80 max-w-xl font-sans font-light leading-relaxed pt-2"
            >
              Building interactive digital experiences with code, design and animation.
              Computer Science Engineering student crafting high-performance web applications.
            </p>

            {/* Action Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-extrabold text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>CONTACT ME</span>
                <Terminal className="w-4 h-4" />
              </a>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-andrew-chatbot'))}
                className="px-7 py-4 rounded-full glass-card border-2 border-amber-400/50 text-amber-300 font-extrabold text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 flex items-center gap-2.5 shadow-xl group"
              >
                <Bot className="w-4 h-4 text-emerald-400 group-hover:text-black transition-colors" />
                <span>ANDREW ASSISTANT</span>
              </button>
            </div>

            {/* First Page Small Social Logo Icons Row */}
            <div ref={socialLogosRef} className="flex items-center space-x-3 pt-4 border-t border-white/10 w-fit">
              <span className="text-[11px] font-mono text-white/40 tracking-widest uppercase mr-1">CONNECT:</span>
              {heroSocials.map((s) => {
                const IconComponent = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    title={s.name}
                    className="p-2.5 rounded-xl glass-panel text-white/70 hover:text-amber-300 hover:border-amber-400 hover:scale-110 transition-all duration-300 shadow-md group"
                  >
                    <IconComponent className="w-4 h-4 transition-transform group-hover:rotate-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Real Portrait Photo of Louie Andrew S */}
          <div
            ref={profileContainerRef}
            onClick={handlePhotoClick}
            className="lg:col-span-5 flex justify-center items-center relative min-h-[480px] sm:min-h-[580px] my-4 lg:my-0 cursor-pointer group select-none"
          >
            <div
              ref={glowRef}
              className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-500/30 to-emerald-400/25 blur-[100px] pointer-events-none transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${offsetX * 15}px, ${offsetY * 15}px, 0)`,
              }}
            />

            <div
              ref={glassCircleRef}
              className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full glass-panel border border-amber-500/40 pointer-events-none transition-transform duration-300 ease-out shadow-[0_25px_90px_rgba(0,0,0,0.8)]"
              style={{
                transform: `translate3d(${offsetX * 30}px, ${offsetY * 30}px, 0) rotate(${offsetX * 10}deg)`,
              }}
            />

            <div
              ref={decorRef}
              className="absolute inset-0 pointer-events-none transition-transform duration-200 ease-out z-30"
              style={{
                transform: `translate3d(${offsetX * 45}px, ${offsetY * 45}px, 0)`,
              }}
            >
              <div className="absolute top-4 left-0 px-3.5 py-2 rounded-xl glass-panel text-[11px] font-mono text-amber-300 border border-amber-500/40 flex items-center gap-2 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>REACT &amp; GSAP</span>
              </div>

              <div className="absolute bottom-6 right-0 px-4 py-2 rounded-xl glass-panel text-[11px] font-mono text-emerald-300 border border-emerald-500/40 shadow-2xl">
                <span>Python &amp; Flask</span>
              </div>

              <div className="absolute top-1/2 right-[-10px] px-3.5 py-1.5 rounded-xl glass-panel text-[11px] font-mono text-cyan-300 border border-cyan-500/40 shadow-2xl">
                <span>B.E. CSE ⚡</span>
              </div>
            </div>

            <div
              className="relative z-20 w-72 sm:w-[360px] aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-2.5 border-2 border-amber-500/40 animate-float-slow transition-transform duration-150 ease-out shadow-[0_30px_90px_rgba(0,0,0,0.9)] group-hover:border-amber-400 group-hover:shadow-[0_30px_100px_rgba(245,158,11,0.4)]"
              style={{
                transform: `translate3d(${offsetX * 60}px, ${offsetY * 60}px, 0) rotate(${offsetX * 3}deg)`,
              }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src="/assets/louie_photo.jpg"
                  alt="Louie Andrew S — Real Profile Portrait"
                  className="w-full h-full object-cover object-top contrast-110 brightness-105 group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-50" />
                
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl glass-card backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    <span>LOUIE ANDREW S</span>
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    CLICK FOR INFO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400 mb-2">SCROLL DOWN</span>
          <ArrowDown className="w-4 h-4 text-emerald-400 animate-bounce" />
        </div>
      </section>

      {/* Photo Info Overlay Modal */}
      <ImageInfoModal
        item={selectedPhotoInfo}
        onClose={() => setSelectedPhotoInfo(null)}
      />
    </>
  );
}
