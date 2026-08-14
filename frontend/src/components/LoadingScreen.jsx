import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState('entering'); // 'entering' -> 'joining' -> 'assembled' -> 'zooming' -> 'done'

  useEffect(() => {
    // Stage 1: Counter progression 0 -> 100
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) {
          const next = prev + Math.floor(Math.random() * 8) + 4;
          const val = Math.min(next, 100);

          if (val >= 45 && val < 85) setPhase('joining');
          if (val >= 85 && val < 100) setPhase('assembled');
          if (val === 100) {
            setPhase('zooming');
            clearInterval(interval);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1000); // Duration of Netflix zoom into camera
          }

          return val;
        }
        return 100;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[1000000] bg-[#030305] text-white flex flex-col justify-between items-center p-8 select-none overflow-hidden transition-all duration-1000 ${
        phase === 'zooming' ? 'opacity-0 scale-[3] pointer-events-none filter blur-lg' : 'opacity-100 scale-100'
      }`}
    >
      {/* Top Studio Telemetry */}
      <div className="w-full max-w-7xl flex items-center justify-between text-xs font-mono tracking-[0.3em] text-white/40 uppercase z-10">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          NETFLIX CINEMATIC ENGINE
        </span>
        <span>LOUIE ANDREW S</span>
      </div>

      {/* CENTER INTRO: NETFLIX "LOUIE" + "ANDREW" JOINING ANIMATION */}
      <div className="relative flex flex-col items-center justify-center my-auto z-10 w-full max-w-5xl">
        {/* Background Crimson / Gold Aura Light Flare */}
        <div
          className={`absolute w-96 h-96 rounded-full bg-gradient-to-r from-red-600/30 via-amber-500/25 to-emerald-500/20 blur-[100px] transition-all duration-700 ${
            phase === 'assembled' || phase === 'zooming'
              ? 'scale-150 opacity-100'
              : 'scale-90 opacity-40'
          }`}
        />

        {/* Letters Joining Container */}
        <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-serif font-black uppercase text-center leading-none tracking-tighter my-6">
          {/* "LOUIE" Flies in from the Left */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              phase === 'entering'
                ? '-translate-x-32 opacity-0 filter blur-xl'
                : phase === 'joining'
                ? '-translate-x-4 opacity-90 filter blur-none'
                : 'translate-x-0 opacity-100'
            }`}
          >
            <span className="text-6xl sm:text-8xl md:text-9xl text-white text-glow">
              LOUIE
            </span>
          </div>

          {/* "ANDREW" Flies in from the Right */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              phase === 'entering'
                ? 'translate-x-32 opacity-0 filter blur-xl'
                : phase === 'joining'
                ? 'translate-x-4 opacity-90 filter blur-none'
                : 'translate-x-0 opacity-100'
            }`}
          >
            <span className="text-6xl sm:text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 drop-shadow-[0_0_45px_rgba(239,68,68,0.5)]">
              ANDREW
            </span>
          </div>
        </div>

        {/* Netflix Light Ribbon Flare Sweep on Join */}
        {(phase === 'assembled' || phase === 'zooming') && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent animate-pulse shadow-[0_0_30px_#f59e0b]" />
        )}

        {/* Subtitle */}
        <div
          className={`transition-all duration-700 delay-200 mt-4 ${
            phase === 'assembled' || phase === 'zooming'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xs sm:text-sm font-mono tracking-[0.4em] text-emerald-400 font-bold uppercase">
            CREATIVE DEVELOPER &amp; FULL-STACK ENGINEER
          </p>
        </div>

        {/* Counter Readout */}
        <div className="mt-12 text-4xl sm:text-6xl font-mono font-bold text-white/90 tracking-tighter">
          {counter}%
        </div>

        {/* Netflix Progress Bar */}
        <div className="w-64 sm:w-80 h-1 bg-white/10 rounded-full overflow-hidden mt-4 relative">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_15px_#ef4444]"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="w-full max-w-7xl flex items-center justify-between text-[11px] font-mono text-white/30 tracking-widest uppercase z-10">
        <span>TA-DUM // CINEMATIC INTRO</span>
        <span>CHENNAI, INDIA</span>
      </div>
    </div>
  );
}
