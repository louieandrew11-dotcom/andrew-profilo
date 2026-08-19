import React from 'react';
import { Check, X } from 'lucide-react';

export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-[#050507]/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-fadeIn">
      {/* Glass Card Container */}
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-white/20 p-8 sm:p-10 text-center space-y-6 shadow-2xl my-auto animate-scaleUp">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass-panel text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Checkmark Circle */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-cyan-400 via-emerald-400 to-purple-600 p-[2px] flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.4)]">
          <div className="w-full h-full rounded-full bg-[#0a0a0e] flex items-center justify-center">
            <Check className="w-10 h-10 text-cyan-400 stroke-[3]" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight text-white text-glow">
            MESSAGE TRANSMITTED
          </h3>
          <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            TARGET: LOUIEANDREW11@GMAIL.COM
          </p>
        </div>

        <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
          Thank you for reaching out! Your message has been sent directly to Louie Andrew. He will get back to you shortly.
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-white text-[#050507] font-bold text-xs font-mono tracking-widest uppercase hover:bg-cyan-400 transition-colors shadow-lg"
        >
          BACK TO PORTFOLIO
        </button>
      </div>
    </div>
  );
}
