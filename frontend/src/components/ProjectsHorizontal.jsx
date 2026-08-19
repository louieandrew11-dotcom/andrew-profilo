import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowRight, Plus, ChevronDown, ChevronUp, Grid } from 'lucide-react';
import ProjectShowcaseContainer from './ProjectShowcaseContainer';
import AddProjectModal from './AddProjectModal';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_PROJECTS = [
  {
    number: 'PROJECT 01',
    title: 'ANI APPLE STORE — APPLE INTELLIGENCE',
    subtitle: 'Smart Commerce with Live Siri AI Assistant & Titanium Showcase',
    description:
      'A sleek dark luxury e-commerce platform built for iPhone 16 Pro and high-end electronics. Integrates live Siri AI Assistant, Grade 5 Titanium showcase, A18 Pro tech spec comparison, and interactive trade-in estimates.',
    fullDescription:
      'Ani Apple Store is a full-stack dark luxury e-commerce web application engineered with modern React frontend architecture and a scalable Python Flask REST backend. Features an integrated live Siri AI Assistant for instant price checking in India, A18 Pro specs comparison, Grade 5 Titanium design showcase, interactive trade-in estimate calculator, Owner Portal, secure payment processing, and real-time MongoDB database updates.',
    tags: ['React', 'Python', 'Flask', 'MongoDB', 'Tailwind CSS', 'GSAP', 'Siri AI'],
    image: '/assets/project_ecommerce.svg',
    liveUrl: 'https://apple-ai-mu.vercel.app/',
    githubUrl: 'https://github.com/louieandrew11-dotcom/ai-electronics-store',
    features: [
      'Live Siri AI Assistant widget with instant iPhone prices, specs & trade-in estimates',
      'Grade 5 Titanium & A18 Pro interactive tech spec comparison engine',
      'Real-time inventory stock sync with MongoDB Atlas & Glassmorphism Owner Portal'
    ]
  },
  {
    number: 'PROJECT 02',
    title: 'SKILLFORGE PLATFORM',
    subtitle: 'Interactive Developer Code Learning & Execution Sandbox',
    description:
      'An interactive educational web platform empowering computer science students to master Python, web development, and algorithms via live in-browser code execution.',
    fullDescription:
      'SkillForge is an advanced interactive learning studio allowing users to solve programming challenges with instant execution feedback. Built with React and Flask execution environment, offering real-time syntax checking, gamified progress tracks, and code performance benchmarks.',
    tags: ['React', 'Python', 'Flask', 'Monaco IDE', 'Docker', 'Tailwind'],
    image: '/assets/project_skillforge.svg',
    liveUrl: 'https://github.com/louieandrew11-dotcom/skillforge-platform',
    githubUrl: 'https://github.com/louieandrew11-dotcom/skillforge-platform',
    features: [
      'In-browser live Python execution sandbox',
      'Interactive learning modules with step-by-step progress tracking',
      'Automated test runner and code output validator',
      'Dark high-tech IDE interface'
    ]
  },
  {
    number: 'PROJECT 03',
    title: 'SLEEPYGO — HOTEL BOOKING',
    subtitle: 'Full-Stack Hotel Reservation Engine & Destination Discovery',
    description:
      'A sleek luxury hotel booking web platform empowering users to search, compare, and reserve over 500,000 hotel rooms across 50+ Indian cities and global destinations.',
    fullDescription:
      'SleepyGo is a full-stack web application built for seamless hotel room reservation and travel destination discovery. Engineered with modern React frontend architecture and a scalable Python Flask REST backend.',
    tags: ['React', 'Python', 'Flask', 'MongoDB', 'Tailwind CSS', 'Vite'],
    image: '/assets/project_sleepygo.png',
    liveUrl: 'https://sleep-go.vercel.app/',
    githubUrl: 'https://github.com/louieandrew11-dotcom/sleepygo-hotel-booking',
    features: [
      'Location-based hotel search covering 500,000+ rooms across 50+ cities',
      'Interactive check-in & check-out date picker with dynamic guest count filter',
      'Real-time hotel room availability sync powered by MongoDB database backend'
    ]
  }
];

export default function ProjectsHorizontal() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [showAll, setShowAll] = useState(false);

  // Fetch permanent projects from Flask backend server
  useEffect(() => {
    const fetchServerProjects = async () => {
      const endpoints = ['http://localhost:5000/api/projects', '/api/projects'];
      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          const contentType = res.headers.get('content-type') || '';
          if (res.ok && contentType.includes('application/json')) {
            const data = await res.json();
            if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
              setProjects(data.projects);
              return;
            }
          }
        } catch {
          // Continue to next endpoint
        }
      }
    };

    fetchServerProjects();
  }, []);

  const handleAddNewProject = (newProj) => {
    const formattedProject = {
      ...newProj,
      number: `PROJECT 0${projects.length + 1}`,
    };
    setProjects((prev) => [...prev, formattedProject]);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  // Optimized GSAP Horizontal Pinned Scroll for PC View & Responsive
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [displayedProjects.length, showAll]);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative w-full min-h-screen bg-[#030305] text-white overflow-hidden border-t border-white/5 flex flex-col justify-center"
      >
        {/* PC View Section Header */}
        <div className="pt-20 lg:pt-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div className="select-none">
            <span className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase block mb-2 font-bold">
              // 03. SELECTED PORTFOLIO WORK
            </span>

            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif tracking-tighter uppercase text-white text-glow">
              SELECTED <span className="text-outline">WORK</span>
            </h2>
          </div>

          {/* PC View Action Buttons: View All & Add Project */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
            {projects.length > 3 && (
              <button
                onClick={toggleShowAll}
                className="px-6 py-3.5 rounded-full glass-panel border border-cyan-500/40 text-cyan-300 font-extrabold text-xs font-mono tracking-widest uppercase flex items-center gap-2 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                <Grid className="w-4 h-4 text-cyan-400" />
                <span>{showAll ? 'SHOW TOP 3' : `VIEW ALL PROJECTS (${projects.length})`}</span>
                {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-extrabold text-xs font-mono tracking-widest uppercase flex items-center gap-2 hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all hover:scale-105 active:scale-95 shadow-2xl border border-amber-300/40"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ ADD MY PROJECT</span>
            </button>
          </div>
        </div>

        {/* Horizontal Track Container (PC View Centered) */}
        <div className="w-full overflow-hidden pb-16 pt-4">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-10 lg:gap-14 px-6 md:px-12 lg:px-20 w-full lg:w-max items-center"
          >
            {displayedProjects.map((proj, idx) => (
              <ProjectCard
                key={proj.number + idx}
                project={proj}
                onOpenModal={() => setSelectedProject(proj)}
              />
            ))}

            {/* View All Projects End Card */}
            {!showAll && projects.length > 3 && (
              <div className="w-[320px] sm:w-[380px] h-[520px] rounded-3xl glass-panel border border-cyan-500/30 p-8 flex flex-col justify-center items-center text-center space-y-6 shrink-0 hover:border-cyan-400 transition-all group shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                  <Grid className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-black uppercase text-white tracking-tight">
                    +{projects.length - 3} MORE PROJECTS
                  </h3>
                  <p className="text-xs font-mono text-cyan-300/80 uppercase tracking-widest">
                    EXPLORE FULL ARCHITECTURE PORTFOLIO
                  </p>
                </div>
                <button
                  onClick={toggleShowAll}
                  className="px-6 py-3.5 rounded-full bg-cyan-400 text-black font-bold text-xs font-mono tracking-widest uppercase flex items-center gap-2 hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all hover:scale-105 active:scale-95"
                >
                  <span>VIEW ALL ({projects.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Full-Screen Project Showcase Container */}
      {selectedProject && (
        <ProjectShowcaseContainer
          project={selectedProject}
          projectsList={projects}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
      )}

      {/* Add New Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddNewProject}
      />
    </>
  );
}

function ProjectCard({ project, onOpenModal }) {
  const cardRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.85, opacity: 0, filter: 'blur(15px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onOpenModal) onOpenModal();
  };

  return (
    <div
      ref={cardRef}
      onClick={handleOpen}
      onPointerDown={handleOpen}
      className="w-full lg:w-[720px] xl:w-[780px] shrink-0 glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-500 shadow-2xl cursor-pointer select-none"
    >
      <div className="flex items-center justify-between mb-6 pointer-events-none">
        <span className="text-xs font-mono text-emerald-400 tracking-[0.25em] font-bold">
          {project.number}
        </span>
        <span className="text-xs font-mono text-white/40 uppercase">
          FULL-STACK APPLICATION
        </span>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 glass-card border border-white/10 group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-60" />

        <div className="absolute inset-0 bg-amber-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm pointer-events-none">
          <div className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-bold text-xs font-mono tracking-widest uppercase shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <span>OPEN SHOWCASE CONTAINER</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6 pointer-events-none">
        <h3 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white group-hover:text-amber-300 transition-colors uppercase">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-emerald-400">
          {project.subtitle}
        </p>
        <p className="text-sm text-white/70 font-sans font-light line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 pointer-events-none">
        {(project.tags || []).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-md text-[11px] font-mono text-white/80 bg-white/5 border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="w-full py-4 rounded-xl glass-button text-white font-bold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all">
        <span>OPEN SHOWCASE CONTAINER</span>
        <ArrowRight className="w-4 h-4 text-amber-400 group-hover:text-black transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}
