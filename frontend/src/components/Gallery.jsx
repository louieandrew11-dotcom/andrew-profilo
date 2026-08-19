import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateCw, Eye, SlidersHorizontal } from 'lucide-react';
import ImageInfoModal from './ImageInfoModal';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery({ setCursorText }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeLightbox, setActiveLightbox] = useState(null);

  // 6 Completely Unique & Authentic Personal Photographs of Louie Andrew S
  const galleryItems = [
    {
      id: 1,
      number: '01',
      title: 'Louie Andrew S — Developer Portrait',
      category: 'CREATIVE PORTRAITS',
      categoryLabel: 'Creative Developer Profile',
      src: '/assets/louie_photo.jpg',
      aspect: 'aspect-[3/4]',
      description: 'Official photograph of Louie Andrew S, Creative Developer & Full-Stack Computer Science Engineer based in Chennai, India.',
    },
    {
      id: 2,
      number: '02',
      title: 'Engineering Event & Symposium Lounge',
      category: 'ACADEMIC & EVENTS',
      categoryLabel: 'Symposium & Event Lounge',
      src: '/assets/louie_lounge.jpg',
      aspect: 'aspect-[3/4]',
      description: 'Louie Andrew S in formal white shirt with college event ID badge sitting in wood-paneled lounge in Chennai.',
    },
    {
      id: 3,
      number: '03',
      title: 'Golden Hour Rooftop Sunset',
      category: 'GOLDEN HOUR & SUNSET',
      categoryLabel: 'Rooftop Sunscape View',
      src: '/assets/louie_sunset.jpg',
      aspect: 'aspect-[3/4]',
      description: 'Louie Andrew S in white embroidered shirt against a golden hour sunset sky on rooftop in Chennai.',
    },
    {
      id: 4,
      number: '04',
      title: 'Full-Length Luxury Interior Selfie',
      category: 'STUDIO PORTRAITS',
      categoryLabel: 'Dark Luxury Style',
      src: '/assets/louie_mirror.jpg',
      aspect: 'aspect-[9/16]',
      description: 'Louie Andrew S full-length mirror selfie in sleek black shirt and grey trousers in luxury marble architecture.',
    },
    {
      id: 5,
      number: '05',
      title: 'Coastal Beach Golden Hour',
      category: 'GOLDEN HOUR & SUNSET',
      categoryLabel: 'Beach & Coastal Vibe',
      src: '/assets/louie_beach.jpg',
      aspect: 'aspect-[3/4]',
      description: 'Louie Andrew S in white long-sleeve sweater on a golden hour coastal beach landscape.',
    },
    {
      id: 6,
      number: '06',
      title: 'Argentina #10 Rooftop Aesthetic',
      category: 'LIFESTYLE & FOOTBALL',
      categoryLabel: 'Rooftop Terrace View',
      src: '/assets/louie_argentina.jpg',
      aspect: 'aspect-[16/9]',
      description: 'Louie Andrew S in Argentina #10 jersey, capturing casual street style and rooftop terrace vibe in Chennai.',
    },
  ];

  const filterTabs = ['ALL', 'CREATIVE PORTRAITS', 'ACADEMIC & EVENTS', 'GOLDEN HOUR & SUNSET', 'STUDIO PORTRAITS', 'LIFESTYLE & FOOTBALL'];

  const filteredItems = activeFilter === 'ALL'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="relative w-full py-32 px-6 md:px-12 lg:px-20 bg-[#030305] text-white overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto z-10 relative space-y-12">
          {/* Header */}
          <div ref={titleRef} className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
              <RotateCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span>// 04. EDITORIAL GALLERY // LOUIE ANDREW S PORTRAIT GALLERY</span>
            </div>

            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif tracking-tighter uppercase text-white text-glow">
              VISUAL <span className="text-outline-gold">WALL</span>
            </h2>
            
            <p className="text-base text-white/60 font-sans max-w-xl font-light">
              Exclusive visual editorial portraits of Louie Andrew S — Creative Developer &amp; Computer Science Engineer.
            </p>
          </div>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
            <SlidersHorizontal className="w-4 h-4 text-amber-400 mr-2" />
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === tab
                    ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-extrabold shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-105'
                    : 'glass-panel text-white/70 hover:text-amber-300 border-white/10'
                }`}
              >
                {tab === 'ALL' ? 'ALL VISUALS' : tab}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
          >
            {filteredItems.map((item, idx) => (
              <Rotating3DGalleryCard
                key={item.id}
                item={item}
                index={idx}
                setCursorText={setCursorText}
                onOpen={() => setActiveLightbox(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Image Info Modal */}
      <ImageInfoModal
        item={activeLightbox}
        onClose={() => setActiveLightbox(null)}
      />
    </>
  );
}

function Rotating3DGalleryCard({ item, setCursorText, onOpen }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({ rx: 0, ry: 0, scale: 1 });

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          rotateY: -75,
          rotateX: 35,
          scale: 0.75,
          opacity: 0,
          filter: 'blur(20px)',
          transformOrigin: '50% 50%',
        },
        {
          rotateY: 0,
          rotateX: 0,
          scale: 1.0,
          opacity: 1.0,
          filter: 'blur(0px)',
          duration: 1.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [item.id]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -22;
    const rotateY = ((x - centerX) / centerX) * 22;

    setTransform({ rx: rotateX, ry: rotateY, scale: 1.06 });
  };

  const handleMouseLeave = () => {
    setTransform({ rx: 0, ry: 0, scale: 1 });
    setCursorText('');
  };

  return (
    <div
      ref={cardRef}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorText('ROTATE & VIEW')}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 cursor-pointer select-none"
    >
      <div
        className={`relative w-full ${item.aspect} rounded-3xl overflow-hidden glass-panel border border-white/15 group shadow-2xl transition-all duration-500 hover:border-amber-500/60 hover:shadow-[0_30px_70px_rgba(245,158,11,0.4)]`}
        style={{
          transform: `perspective(1000px) rotateX(${transform.rx}deg) rotateY(${transform.ry}deg) scale(${transform.scale})`,
          transition: 'transform 0.15s ease-out, border-color 0.4s ease',
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out filter contrast-[1.08] group-hover:scale-110 group-hover:rotate-2"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-300" />

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-panel text-[11px] font-mono text-amber-300 border border-amber-500/30 font-bold">
          {item.number}
        </div>

        <div className="absolute top-4 right-4 p-2.5 rounded-full glass-panel text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors shadow-lg">
          <RotateCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-700" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-extrabold font-mono text-xs tracking-widest uppercase shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <span>ROTATE &amp; INSPECT</span>
            <Eye className="w-4 h-4" />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
            {item.categoryLabel}
          </span>
          <h4 className="text-xl font-serif font-black text-white group-hover:text-amber-300 group-hover:text-glow transition-colors uppercase">
            {item.title}
          </h4>
        </div>
      </div>
    </div>
  );
}
