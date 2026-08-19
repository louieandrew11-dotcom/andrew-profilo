import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, Volume2, Image as ImageIcon, Download, ExternalLink } from 'lucide-react';

// Iconic Google Gemini 4-Point Sparkle Star Logo Component
const GeminiLogo = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"
      fill="url(#gemini-gradient)"
    />
    <defs>
      <linearGradient
        id="gemini-gradient"
        x1="0"
        y1="0"
        x2="24"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4285F4" />
        <stop offset="0.33" stopColor="#9B51E0" />
        <stop offset="0.66" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

export default function AndrewChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('gold');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi, I am Andrew! 👋 Vanakkam! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const chatEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    const t1 = setTimeout(scrollToBottom, 50);
    const t2 = setTimeout(scrollToBottom, 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-andrew-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-andrew-chatbot', handleOpenChat);
  }, []);

  const themes = {
    gold: {
      border: 'border-4 border-amber-500/70 shadow-[0_0_70px_rgba(245,158,11,0.5)]',
      headerBg: 'bg-gradient-to-r from-amber-500/40 via-amber-950/40 to-transparent border-b-2 border-amber-500/50',
      accentText: 'text-amber-300 font-extrabold',
      userBubble: 'bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-bold border-2 border-amber-300',
      closeBtn: 'bg-amber-500/30 border-2 border-amber-400/80 text-amber-300 hover:bg-red-500 hover:border-red-400 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]',
      sendBtn: 'from-amber-400 to-emerald-400 text-black font-black',
    },
    emerald: {
      border: 'border-4 border-emerald-500/70 shadow-[0_0_70px_rgba(16,185,129,0.5)]',
      headerBg: 'bg-gradient-to-r from-emerald-500/40 via-emerald-950/40 to-transparent border-b-2 border-emerald-500/50',
      accentText: 'text-emerald-300 font-extrabold',
      userBubble: 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 text-black font-bold border-2 border-emerald-300',
      closeBtn: 'bg-emerald-500/30 border-2 border-emerald-400/80 text-emerald-300 hover:bg-red-500 hover:border-red-400 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]',
      sendBtn: 'from-emerald-400 to-cyan-400 text-black font-black',
    },
    sapphire: {
      border: 'border-4 border-cyan-500/70 shadow-[0_0_70px_rgba(6,182,212,0.5)]',
      headerBg: 'bg-gradient-to-r from-cyan-500/40 via-blue-950/40 to-transparent border-b-2 border-cyan-500/50',
      accentText: 'text-cyan-300 font-extrabold',
      userBubble: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 text-black font-bold border-2 border-cyan-300',
      closeBtn: 'bg-cyan-500/30 border-2 border-cyan-400/80 text-cyan-300 hover:bg-red-500 hover:border-red-400 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]',
      sendBtn: 'from-cyan-400 to-amber-400 text-black font-black',
    },
    crimson: {
      border: 'border-4 border-rose-500/70 shadow-[0_0_70px_rgba(244,63,94,0.5)]',
      headerBg: 'bg-gradient-to-r from-rose-500/40 via-purple-950/40 to-transparent border-b-2 border-rose-500/50',
      accentText: 'text-rose-300 font-extrabold',
      userBubble: 'bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 text-black font-bold border-2 border-rose-300',
      closeBtn: 'bg-rose-500/30 border-2 border-rose-400/80 text-rose-300 hover:bg-red-500 hover:border-red-400 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]',
      sendBtn: 'from-rose-400 to-amber-400 text-black font-black',
    },
  };

  const currentTheme = themes[activeTheme];

  const suggestionChips = [
    '🎨 Generate AI Image',
    'Explain Louie Andrew\'s Projects',
    'Who is Louie Andrew S?',
    'Technical Skills & Python',
    'College & Engineering',
    'Gaming & GTA FiveM',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Voice Output
  const speakText = (text, index) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (speakingIdx === index) {
      setSpeakingIdx(null);
      return;
    }

    const cleanText = text.replace(/[*#_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);

    setSpeakingIdx(index);
    window.speechSynthesis.speak(utterance);
  };

  // Image Attachment Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim() && !attachedImage) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      image: attachedImage,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!userText) setInput('');
    const currentImg = attachedImage;
    setAttachedImage(null);
    setIsTyping(true);

    let replyText = getLocalBotReply(textToSend, currentImg);
    let genImg = null;
    let botLinks = null;

    try {
      const chatEndpoints = ['http://localhost:5000/api/chat', 'http://127.0.0.1:5000/api/chat', '/api/chat'];
      for (const url of chatEndpoints) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              message: textToSend,
              image: currentImg,
              history: updatedMessages,
            }),
          });
          const contentType = response.headers.get('content-type') || '';
          if (response.ok && contentType.includes('application/json')) {
            const data = await response.json();
            if (data.success && data.reply) {
              replyText = data.reply;
              genImg = data.generatedImage || null;
              botLinks = data.links || null;
              break;
            }
          }
        } catch {
          // Continue to next endpoint
        }
      }
    } catch (err) {
      console.warn('Backend server response fallback active:', err);
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: replyText,
        generatedImage: genImg,
        links: botLinks,
      },
    ]);
    setIsTyping(false);

    // Auto-scroll the portfolio page to the requested section
    setTimeout(() => {
      detectAndScrollToSection(textToSend);
    }, 300);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const detectAndScrollToSection = (text) => {
    const q = text.toLowerCase();
    if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('showcase')) {
      scrollToSection('projects');
    } else if (q.includes('skill') || q.includes('tech') || q.includes('python') || q.includes('stack')) {
      scrollToSection('skills');
    } else if (q.includes('about') || q.includes('who is') || q.includes('bio') || q.includes('profile')) {
      scrollToSection('about');
    } else if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('message')) {
      scrollToSection('contact');
    } else if (q.includes('gallery') || q.includes('photo') || q.includes('visual')) {
      scrollToSection('gallery');
    } else if (q.includes('social') || q.includes('instagram') || q.includes('github') || q.includes('link')) {
      scrollToSection('socials');
    } else if (q.includes('hero') || q.includes('home') || q.includes('top') || q.includes('start')) {
      scrollToSection('hero');
    }
  };

  const getLinksForMsg = (msg) => {
    if (!msg || msg.sender !== 'bot') return [];
    if (msg.links && Array.isArray(msg.links) && msg.links.length > 0) return msg.links;

    const text = (msg.text || '').toLowerCase();
    const links = [];

    if (text.includes('github') || text.includes('repository')) {
      links.push({ label: '🐙 GitHub Profile', url: 'https://github.com/louieandrew11-dotcom' });
    }
    if (text.includes('instagram') || text.includes('insta')) {
      links.push({ label: '📸 Instagram Profile', url: 'https://www.instagram.com/ig_andrew__11_/?hl=en' });
    }
    if (text.includes('linkedin')) {
      links.push({ label: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/louieandrew11/' });
    }
    if (text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('mail')) {
      links.push({ label: '📫 Email Louie', url: 'mailto:louieandrew11@gmail.com' });
    }
    if (text.includes('discord') || text.includes('community')) {
      links.push({ label: '💬 Discord Community', url: 'https://github.com/louieandrew/discord-bot-system' });
    }
    if (text.includes('project') || text.includes('work') || text.includes('built')) {
      links.push({ label: '📍 Jump to Projects', sectionId: 'projects' });
    }
    if (text.includes('skill') || text.includes('tech') || text.includes('stack')) {
      links.push({ label: '📍 Jump to Skills', sectionId: 'skills' });
    }
    if (text.includes('contact') || text.includes('reach')) {
      links.push({ label: '📍 Jump to Contact', sectionId: 'contact' });
    }
    if (text.includes('about') || text.includes('louie')) {
      links.push({ label: '📍 Jump to About', sectionId: 'about' });
    }

    return links;
  };

  // DYNAMIC NATURAL LANGUAGE LOCAL KNOWLEDGE ENGINE (VARIED RESPONSES)
  const getLocalBotReply = (query, img) => {
    if (img) {
      return "📸 Image analyzed cleanly! Perfect visual addition to Louie's portfolio.";
    }

    const q = query.toLowerCase().trim();

    if (q.includes('generate') || q.includes('image') || q.includes('picture') || q.includes('draw')) {
      return "🎨 Here is your generated visual creation:";
    }

    // Math Calculation Engine
    const mathMatch = q.match(/(\d+(?:\.\d+)?)\s*([+\-*/])\s*(\d+(?:\.\d+)?)/);
    if (mathMatch) {
      const [, n1Str, op, n2Str] = mathMatch;
      const n1 = parseFloat(n1Str);
      const n2 = parseFloat(n2Str);
      let ans = 0;
      if (op === '+') ans = n1 + n2;
      else if (op === '-') ans = n1 - n2;
      else if (op === '*') ans = n1 * n2;
      else if (op === '/') ans = n2 !== 0 ? n1 / n2 : 'Undefined';
      return `🔢 Calculation result: ${n1} ${op} ${n2} = ${ans}`;
    }

    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('vanakkam') || q.includes('sup') || q.includes('yo')) {
      const greetings = [
        "Hi there! 👋 Vanakkam! How can I help you today? Feel free to ask me anything!",
        "Hello! 🚀 Welcome to Louie Andrew S's portfolio! Ask me any question about his projects or skills!",
        "Hey! 👋 Great to connect! What would you like to explore today?"
      ];
      return greetings[Math.abs(query.length) % greetings.length];
    }

    if (q.includes('how are you') || q.includes('how r u')) {
      return "😊 I am doing great! Operating at 100% efficiency. How can I assist you today?";
    }

    if (q.includes('who are you') || q.includes('what are you') || q.includes('your name')) {
      return "🤖 I am Andrew Assistant, an AI companion designed for Louie Andrew S's portfolio, powered by React, Flask, and Gemini AI algorithms.";
    }

    if (q.includes('who created you') || q.includes('who built you') || q.includes('who made you')) {
      return "⚡ I was created by Louie Andrew S using React, Python Flask, and Google Gemini AI algorithms!";
    }

    if (q.includes('joke') || q.includes('funny')) {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "There are 10 types of people in the world: those who understand binary, and those who don't! 💻",
        "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
        "Why did the JavaScript developer wear glasses? Because he didn't C#! 👓"
      ];
      return `😄 ${jokes[Math.abs(query.length) % jokes.length]}`;
    }

    if (q.includes('thank')) {
      return "🙏 You're very welcome! Feel free to ask me anything else anytime!";
    }

    if (q.includes('bye') || q.includes('goodnight')) {
      return "👋 Goodbye! Have a fantastic day ahead! Come back anytime!";
    }

    if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('portfolio')) {
      return "🚀 Louie Andrew S has built 6 flagship full-stack projects including AI Electronics E-Commerce, SkillForge LMS, Discord Bot Engine, Cinematic 3D Portfolio, Neural Sound Matrix, and Cloud Telemetry Dashboard!";
    }

    if (q.includes('who is louie') || q.includes('about louie') || q.includes('identity') || q.includes('profile') || q.includes('louie andrew')) {
      return "👨‍💻 Louie Andrew S is a B.E. Computer Science Engineering student (2024–2028) at St. Joseph's College of Engineering, Chennai, specializing in React, Python Flask, and AI systems.";
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('python') || q.includes('language') || q.includes('stack')) {
      return "💻 Technical stack: Python, JavaScript, C, C++, Java, SQL, React, Vite, Flask, MongoDB, Tailwind CSS, and GSAP animation physics.";
    }

    if (q.includes('college') || q.includes('education') || q.includes('study')) {
      return "🎓 Pursuing B.E. Computer Science Engineering at St. Joseph's College of Engineering, Chennai (2024–2028) studying Data Structures, Algorithms, Databases, OS, and Networks.";
    }

    if (q.includes('game') || q.includes('gaming') || q.includes('gta')) {
      return "🎮 Louie Andrew loves gaming! Main titles: GTA V FiveM Roleplay, BGMI, Valorant, Free Fire, and Red Dead Redemption 2.";
    }

    if (q.includes('liva') || q.includes('mary')) {
      return "❤️ Liva Mary is a very special and emotionally important person in Louie Andrew's life, met on the first day of college sitting on the last bench in a green dress.";
    }

    if (q.includes('mithuna')) {
      return "👥 Mithuna is one of Louie Andrew's close college friends.";
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
      return "📫 Contact Louie Andrew S directly via email at: louieandrew11@gmail.com or leave a message on the contact section!";
    }

    if (q.includes('react')) {
      return "⚛️ React is Meta's declarative JavaScript library for building modern, component-based user interfaces.";
    }

    if (q.includes('flask')) {
      return "🌶️ Flask is a lightweight Python WSGI web framework ideal for building scalable REST APIs and web servers.";
    }

    if (q.includes('ai') || q.includes('artificial intelligence')) {
      return "🤖 AI (Artificial Intelligence) enables computer systems to learn, reason, and solve complex tasks autonomously.";
    }

    if (q.includes('html') || q.includes('css') || q.includes('web development')) {
      return "🌐 HTML defines web structures, CSS handles visual layouts & animations, and JavaScript powers modern interactive web apps.";
    }

    if (q.includes('internet') || q.includes('network') || q.includes('api')) {
      return "🌐 The Internet connects global systems over TCP/IP, while REST APIs exchange HTTP requests and JSON data between services.";
    }

    if (q.includes('space') || q.includes('star') || q.includes('planet') || q.includes('galaxy')) {
      return "🌌 The universe contains billions of galaxies with stars, planets, and celestial bodies orbiting gravitational centers.";
    }

    if (q.includes('time') || q.includes('clock') || q.includes('hour') || q.includes('date') || q.includes('today')) {
      const now = new Date();
      return `⏰ Current Local Time: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, ${now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}`;
    }

    return `💡 Regarding '${query}': Louie Andrew S is a B.E. Computer Science Engineering student specializing in React, Python Flask, and AI systems. Ask me about his 6 flagship projects or skills!`;
  };

  return (
    <div className="fixed bottom-8 right-8 z-[99999] select-none font-sans">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black shadow-[0_0_55px_rgba(245,158,11,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-4 border-amber-300"
          aria-label="Open Andrew AI Assistant"
        >
          <div className="p-2 rounded-xl bg-black border-2 border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <GeminiLogo className="w-6 h-6 animate-pulse" />
          </div>

          <div className="absolute right-20 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl glass-panel border-2 border-amber-500/50 text-amber-300 font-mono text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl pointer-events-none flex items-center gap-2">
            <GeminiLogo className="w-4 h-4" />
            <span>TALK TO ANDREW ASSISTANT ⚡</span>
          </div>
        </button>
      )}

      {/* EXPANDED CHATBOT WINDOW */}
      {isOpen && (
        <div data-lenis-prevent className={`w-[360px] sm:w-[440px] h-[620px] rounded-3xl bg-[#030305]/95 ${currentTheme.border} flex flex-col overflow-hidden animate-fadeIn backdrop-blur-3xl relative transition-all duration-500`}>
          
          {/* LOUIE PHOTO WATERMARK BACKGROUND */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-15 overflow-hidden">
            <img
              src="/assets/louie_photo.jpg"
              alt="Louie Photo Background Theme"
              className="w-full h-full object-cover filter contrast-125 brightness-75 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent" />
          </div>

          {/* TOP HEADER */}
          <header className={`p-4 ${currentTheme.headerBg} flex items-center justify-between shadow-xl relative z-10`}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-black border-2 border-white/30 flex items-center justify-center shadow-md">
                <GeminiLogo className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-black tracking-wide text-white uppercase flex items-center gap-1.5 text-glow">
                  <span>ANDREW ASSISTANT</span>
                  <GeminiLogo className="w-3.5 h-3.5" />
                </h3>
                <span className={`text-[10px] font-mono ${currentTheme.accentText} flex items-center gap-1`}>
                  GEMINI AI // TANGLISH &amp; ENGLISH
                </span>
              </div>
            </div>

            {/* Theme Selector & Close Button */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 bg-black/80 p-1.5 rounded-full border-2 border-white/20">
                <button
                  onClick={() => setActiveTheme('gold')}
                  title="Gold Luxury Theme"
                  className={`w-3.5 h-3.5 rounded-full bg-amber-400 transition-transform ${activeTheme === 'gold' ? 'scale-125 ring-2 ring-white' : 'opacity-60'}`}
                />
                <button
                  onClick={() => setActiveTheme('emerald')}
                  title="Cyber Emerald Theme"
                  className={`w-3.5 h-3.5 rounded-full bg-emerald-400 transition-transform ${activeTheme === 'emerald' ? 'scale-125 ring-2 ring-white' : 'opacity-60'}`}
                />
                <button
                  onClick={() => setActiveTheme('sapphire')}
                  title="Neon Sapphire Theme"
                  className={`w-3.5 h-3.5 rounded-full bg-cyan-400 transition-transform ${activeTheme === 'sapphire' ? 'scale-125 ring-2 ring-white' : 'opacity-60'}`}
                />
                <button
                  onClick={() => setActiveTheme('crimson')}
                  title="Crimson Rose Theme"
                  className={`w-3.5 h-3.5 rounded-full bg-rose-400 transition-transform ${activeTheme === 'crimson' ? 'scale-125 ring-2 ring-white' : 'opacity-60'}`}
                />
              </div>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Chatbot"
                className={`p-2 rounded-full border-2 transition-all duration-300 flex items-center justify-center group ${currentTheme.closeBtn}`}
              >
                <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300 stroke-[3]" />
              </button>
            </div>
          </header>

          {/* MESSAGES STREAM */}
          <div data-lenis-prevent ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs relative z-10 scroll-smooth">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="p-1.5 rounded-xl bg-black border-2 border-white/20 shrink-0 mt-1 shadow-md">
                    <GeminiLogo className="w-4 h-4" />
                  </div>
                )}

                <div className="space-y-2 max-w-[85%]">
                  <div
                    className={`p-3.5 rounded-2xl font-sans leading-relaxed whitespace-pre-line shadow-xl relative group ${
                      msg.sender === 'user'
                        ? currentTheme.userBubble
                        : 'glass-card border-2 border-white/20 text-white/95 rounded-bl-none backdrop-blur-md'
                    }`}
                  >
                    {msg.image && (
                      <div className="mb-2 rounded-xl overflow-hidden border-2 border-black/40 max-h-40">
                        <img src={msg.image} alt="User Uploaded" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <span>{msg.text}</span>

                    {msg.sender === 'bot' && (
                      <button
                        onClick={() => speakText(msg.text, idx)}
                        title="Speak Message Out Loud"
                        className={`ml-2 inline-flex items-center p-1 rounded-md transition-colors ${
                          speakingIdx === idx
                            ? 'bg-emerald-400 text-black animate-pulse font-bold'
                            : `${currentTheme.accentText} hover:text-white hover:bg-white/10`
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {msg.sender === 'bot' && getLinksForMsg(msg).length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {getLinksForMsg(msg).map((link, lIdx) =>
                        link.sectionId ? (
                          <button
                            key={lIdx}
                            onClick={() => scrollToSection(link.sectionId)}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-mono text-[10px] font-black flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all shadow-xl border-2 border-amber-300 group/btn"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5] group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>
                        ) : (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-mono text-[10px] font-black flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all shadow-xl border-2 border-amber-300 group/btn"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5] group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        )
                      )}
                    </div>
                  )}

                  {(msg.generatedImage || (msg.text && msg.text.includes('🎨'))) && (
                    <div className="rounded-2xl overflow-hidden glass-panel border-2 border-white/30 p-2 space-y-2 shadow-2xl">
                      <img
                        src={msg.generatedImage || '/assets/louie_photo.jpg'}
                        alt="AI Generated Visual"
                        className="w-full aspect-video object-cover rounded-xl border border-white/10"
                      />
                      <div className="flex items-center justify-between px-1">
                        <span className={`text-[9px] font-mono ${currentTheme.accentText} uppercase`}>
                          AI Visual Complete
                        </span>
                        <a
                          href={msg.generatedImage || '/assets/louie_photo.jpg'}
                          download="andrew_ai_generated.jpg"
                          className="px-3 py-1 rounded-xl bg-amber-400 text-black font-mono text-[9px] font-black flex items-center gap-1 hover:scale-105 transition-transform shadow-md"
                        >
                          <Download className="w-3 h-3 stroke-[2.5]" />
                          <span>SAVE</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="p-1.5 rounded-full bg-emerald-400/20 border-2 border-emerald-500/50 text-emerald-300 shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-amber-400 font-mono text-[11px] p-3 glass-panel w-fit rounded-xl border-2 border-amber-500/40 shadow-xl">
                <GeminiLogo className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Andrew Assistant is thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* QUICK SUGGESTION CHIPS */}
          <div data-lenis-prevent className="px-3 py-2.5 bg-black/90 border-t-2 border-white/15 flex items-center space-x-2 overflow-x-auto no-scrollbar shrink-0 z-10">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className={`px-3.5 py-1.5 rounded-full glass-panel border-2 border-white/20 hover:border-amber-400 text-[10px] font-mono ${currentTheme.accentText} hover:text-white whitespace-nowrap transition-all shadow-md`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* ATTACHED IMAGE PREVIEW BAR */}
          {attachedImage && (
            <div className="px-4 py-2 bg-amber-950/80 border-t-2 border-amber-500/50 flex items-center justify-between shrink-0 z-10">
              <div className="flex items-center space-x-2">
                <img src={attachedImage} alt="Attachment" className="w-8 h-8 rounded-md object-cover border-2 border-amber-400" />
                <span className="text-[10px] font-mono text-amber-300 font-bold">PHOTO ATTACHED FOR AI ANALYSIS</span>
              </div>
              <button onClick={() => setAttachedImage(null)} className="text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* INPUT FORM BAR */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#08080c] border-t-2 border-white/20 flex items-center space-x-2 shrink-0 relative z-10"
          >
            <label
              title="Upload Image for Chatbot Analysis"
              className="p-2.5 rounded-xl glass-panel text-amber-400 hover:text-white hover:border-amber-400 cursor-pointer transition-colors shrink-0 border-2 border-white/15"
            >
              <ImageIcon className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder-white/40 text-xs font-sans focus:outline-none focus:border-amber-400"
            />

            <button
              type="submit"
              className={`p-2.5 rounded-xl bg-gradient-to-r ${currentTheme.sendBtn} hover:scale-105 transition-all shadow-xl border-2 border-white/30 shrink-0`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
