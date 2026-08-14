import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, GraduationCap, MapPin, Heart, Code, Sparkles } from 'lucide-react';
import ImageInfoModal from './ImageInfoModal';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const portraitRef = useRef(null);
  const detailsRef = useRef(null);
  const bgCircleRef = useRef(null);
  const [selectedPhotoInfo, setSelectedPhotoInfo] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgCircleRef.current, {
        y: -120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(portraitRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(textRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

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

  const handlePhotoClick = () => {
    setSelectedPhotoInfo({
      title: 'Louie Andrew S — Engineering Student',
      category: 'ABOUT PORTRAIT // CREATIVE DEVELOPER',
      src: '/assets/louie_photo.jpg',
      description: 'Computer Science Engineering student at Chennai, India. Passionate about modern web development, GSAP animation physics, micro-interactions, Python Flask architecture, and interactive digital experiences.',
    });
  };

  const profileSpecs = [
    { label: 'NAME', value: 'Louie Andrew S', icon: User },
    { label: 'ROLE', value: 'Creative Developer', icon: Code },
    { label: 'EDUCATION', value: 'B.E. Computer Science Engineering', icon: GraduationCap },
    { label: 'LOCATION', value: 'Chennai, India', icon: MapPin },
  ];

  const interests = [
    'Web Development',
    'Animation',
    'Python',
    'UI/UX',
    'Gaming',
    'Creative Technology',
  ];

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className="relative w-full py-28 px-6 md:px-12 lg:px-20 bg-[#030305] overflow-hidden border-t border-white/5"
      >
        <div
          ref={bgCircleRef}
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-600/10 via-emerald-600/10 to-transparent blur-[120px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto z-10 relative">
          <div ref={titleRef} className="mb-16">
            <span className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase block mb-2">
              // 01. PERSPECTIVE
            </span>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif tracking-tighter uppercase text-white text-glow">
              ABOUT <span className="text-outline">ME</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Portrait Photo Card */}
            <div ref={portraitRef} className="lg:col-span-5 flex flex-col justify-center">
              <div
                onClick={handlePhotoClick}
                className="relative rounded-3xl overflow-hidden glass-panel p-3 border border-amber-500/30 shadow-2xl group cursor-pointer select-none"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-amber-950/30 to-slate-900/80 flex items-center justify-center">
                  <img
                    src="/assets/louie_photo.jpg"
                    alt="Louie Andrew S — Creative Developer Real Portrait"
                    className="w-full h-full object-cover object-top contrast-110 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-70" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-amber-400 block mb-1 font-bold">LOUIE ANDREW S</span>
                      <span className="text-xs font-sans font-medium text-white/90">
                        B.E. Computer Science Engineering
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                      INSPECT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div ref={textRef} className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="glass-card p-8 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                  Crafting Code &amp; Motion into Digital Art
                </h3>
                <p className="text-base sm:text-lg text-white/80 font-sans font-light leading-relaxed">
                  "I'm Louie Andrew S, a Computer Science Engineering student and creative developer passionate about web development, animation, Python, UI design and interactive experiences."
                </p>
                <p className="text-sm text-white/60 font-sans font-light leading-relaxed">
                  Combining engineering precision with aesthetic visual design, I create fast, engaging, and unforgettable digital experiences that leave a lasting mark.
                </p>
              </div>

              <div ref={detailsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileSpecs.map((spec) => {
                  const IconComponent = spec.icon;
                  return (
                    <div
                      key={spec.label}
                      className="glass-card p-5 rounded-xl border border-white/10 flex items-start space-x-4 hover:border-amber-500/40 transition-colors"
                    >
                      <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-white/40 tracking-widest block uppercase font-bold">
                          {spec.label}
                        </span>
                        <span className="text-sm font-sans font-semibold text-white/90">
                          {spec.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase block mb-3 flex items-center gap-2 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>INTERESTS &amp; PASSIONS</span>
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 rounded-full text-xs font-mono text-white/90 bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-amber-400/10 transition-all duration-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Modal */}
      <ImageInfoModal
        item={selectedPhotoInfo}
        onClose={() => setSelectedPhotoInfo(null)}
      />
    </>
  );
}
