import React, { useState } from 'react';
import {
  Code,
  FileCode2,
  Terminal,
  Cpu,
  Database,
  Layers,
  Layout,
  GitBranch,
  Sparkles,
  Server,
  Zap,
} from 'lucide-react';

export default function Skills() {
  const skillsData = [
    { name: 'HTML', category: 'Frontend', icon: Code, color: 'from-orange-500 to-amber-500' },
    { name: 'CSS', category: 'Styling', icon: FileCode2, color: 'from-blue-500 to-cyan-500' },
    { name: 'JAVASCRIPT', category: 'Core Logic', icon: Terminal, color: 'from-yellow-400 to-amber-500' },
    { name: 'REACT', category: 'UI Framework', icon: Cpu, color: 'from-cyan-400 to-blue-600' },
    { name: 'PYTHON', category: 'Backend & AI', icon: Server, color: 'from-blue-600 to-emerald-500' },
    { name: 'FLASK', category: 'Micro-Framework', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { name: 'MONGODB', category: 'NoSQL Database', icon: Database, color: 'from-emerald-400 to-teal-600' },
    { name: 'MYSQL', category: 'Relational DB', icon: Database, color: 'from-sky-500 to-indigo-600' },
    { name: 'GSAP', category: 'Web Animation', icon: Sparkles, color: 'from-green-400 to-emerald-600' },
    { name: 'UI/UX', category: 'Interface Design', icon: Layout, color: 'from-pink-500 to-rose-600' },
    { name: 'GITHUB', category: 'Version Control', icon: GitBranch, color: 'from-slate-400 to-slate-200' },
  ];

  return (
    <section
      id="skills"
      className="relative w-full py-28 px-6 md:px-12 lg:px-20 bg-[#050507] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase block mb-2">
            // 02. CAPABILITIES
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif tracking-tighter uppercase text-white text-glow">
            WHAT <span className="text-outline">I BUILD</span>
          </h2>
          <p className="text-base text-white/60 font-sans max-w-xl mt-4 font-light">
            Interactive glass cards powered by modern engineering &amp; high-performance web frameworks.
          </p>
        </div>

        {/* Floating 3D Tilt Glass Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillsData.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }) {
  const [transform, setTransform] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt X
    const rotateY = ((x - centerX) / centerX) * 12;  // tilt Y
    const translateMouseX = ((x - centerX) / centerX) * 8; // magnetic X
    const translateMouseY = ((y - centerY) / centerY) * 8; // magnetic Y

    setTransform({ rx: rotateX, ry: rotateY, tx: translateMouseX, ty: translateMouseY });
  };

  const handleMouseLeave = () => {
    setTransform({ rx: 0, ry: 0, tx: 0, ty: 0 });
    setIsHovered(false);
  };

  const IconComponent = skill.icon;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 cursor-pointer"
    >
      <div
        className={`glass-card p-7 rounded-2xl border border-white/10 relative overflow-hidden transition-all duration-300 ease-out select-none group ${
          isHovered ? 'border-purple-500/50 shadow-[0_20px_50px_rgba(168,85,247,0.25)]' : ''
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${transform.rx}deg) rotateY(${transform.ry}deg) translate3d(${transform.tx}px, ${transform.ty}px, 0)`,
        }}
      >
        {/* Glow Accent Backdrop */}
        <div
          className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500 pointer-events-none`}
        />

        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div
            className={`p-3.5 rounded-xl glass-panel text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br ${skill.color} group-hover:text-black group-hover:shadow-lg`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/40 group-hover:text-cyan-400 transition-colors uppercase">
            {skill.category}
          </span>
        </div>

        {/* Skill Title */}
        <h3 className="text-2xl font-serif font-black tracking-wider text-white/80 group-hover:text-white group-hover:text-glow transition-colors">
          {skill.name}
        </h3>

        {/* Interactive Indicator Bar */}
        <div className="mt-6 w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-500 ease-out ${
              isHovered ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
