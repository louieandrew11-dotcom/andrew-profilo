import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectsHorizontal from './components/ProjectsHorizontal';
import Gallery from './components/Gallery';
import KineticTypography from './components/KineticTypography';
import Socials from './components/Socials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AndrewChatbot from './components/AndrewChatbot';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');
  const [lenisRef, setLenisRef] = useState(null);

  // Track global mouse position for 3D camera shift
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize Lenis Inertia Smooth Scrolling & GSAP Synchronization
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenisRef(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      setLenisRef(null);
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-[#030305] text-[#ffffff] font-sans selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* Film Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* Netflix-Style Ta-Dum Loading Screen */}
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Custom Interactive Ring & Dot Cursor */}
          <CustomCursor mousePos={mousePos} cursorText={cursorText} />

          {/* Navigation Bar */}
          <Navbar lenis={lenisRef} />

          {/* Main Content Sections */}
          <main className="relative z-10 space-y-0">
            <Hero mousePos={mousePos} />
            <About />
            <Skills />
            <ProjectsHorizontal />
            <Gallery setCursorText={setCursorText} />
            <KineticTypography setCursorText={setCursorText} />
            <Socials />
            <Contact />
          </main>

          {/* Andrew AI Chatbot Assistant */}
          <AndrewChatbot />

          {/* Footer */}
          <Footer lenis={lenisRef} />
        </>
      )}
    </div>
  );
}
