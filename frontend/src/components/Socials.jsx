import React from 'react';
import { ArrowUpRight, MessageSquare, Mail } from 'lucide-react';

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

export default function Socials() {
  const socialLinks = [
    {
      name: 'GITHUB',
      handle: '@louieandrew11-dotcom',
      url: 'https://github.com/louieandrew11-dotcom',
      icon: GithubIcon,
    },
    {
      name: 'LINKEDIN',
      handle: 'in/louieandrew11',
      url: 'https://www.linkedin.com/in/louieandrew11/',
      icon: LinkedinIcon,
    },
    {
      name: 'INSTAGRAM',
      handle: '@ig_andrew__11_',
      url: 'https://www.instagram.com/ig_andrew__11_/?hl=en',
      icon: InstagramIcon,
    },
    {
      name: 'DISCORD',
      handle: 'louieandrew#0001',
      url: 'https://discord.com',
      icon: MessageSquare,
    },
    {
      name: 'EMAIL',
      handle: 'louieandrew11@gmail.com',
      url: 'mailto:louieandrew11@gmail.com',
      icon: Mail,
    },
  ];

  return (
    <section
      id="socials"
      className="relative w-full py-28 px-6 md:px-12 lg:px-20 bg-[#050507] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-xs font-mono text-purple-400 tracking-[0.3em] uppercase block mb-2">
            // 06. DIGITAL PRESENCE
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif tracking-tighter uppercase text-white text-glow">
            LET'S <span className="text-outline">CONNECT</span>
          </h2>
        </div>

        {/* Social Links Stack */}
        <div className="space-y-4">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group relative block p-8 rounded-2xl glass-panel border border-white/10 hover:border-purple-400/50 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
              >
                {/* Horizontal Expansion Line */}
                <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-purple-600/10 via-cyan-500/10 to-transparent group-hover:w-full transition-all duration-700 ease-out" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="p-4 rounded-xl glass-card text-white/70 group-hover:text-cyan-300 group-hover:rotate-12 transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white group-hover:text-purple-300 group-hover:translate-x-3 transition-all duration-300">
                        {social.name}
                      </h3>
                      <span className="text-xs font-mono text-white/50 group-hover:text-cyan-400 transition-colors">
                        {social.handle}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="p-4 rounded-full glass-button text-white group-hover:bg-white group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
