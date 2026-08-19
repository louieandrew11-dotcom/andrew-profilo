import os
import re
import json
import ssl
import datetime
import urllib.request
import urllib.error
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'louie_andrew_portfolio_secret_key_2026')

# Enable global CORS for all domains & routes
CORS(app, resources={r"/*": {"origins": "*"}})

# Create unverified SSL context for reliable HTTPS API calls on Windows
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
GROQ_API_KEY = os.getenv('GROQ_API_KEY', '')
MESSAGES_FILE = os.path.join(os.path.dirname(__file__), 'messages.json')
PROJECTS_FILE = os.path.join(os.path.dirname(__file__), 'projects.json')

DEFAULT_FLAGSHIP_PROJECTS = [
  {
    "number": "PROJECT 01",
    "title": "ANI APPLE STORE — APPLE INTELLIGENCE",
    "subtitle": "Smart E-Commerce Platform with Live Siri AI Assistant & Titanium Showcase",
    "description": "A sleek dark luxury Apple e-commerce platform built for iPhone 16 Pro and high-end electronics. Integrates live Siri AI Assistant, Grade 5 Titanium showcase, A18 Pro tech spec comparison, and interactive trade-in estimates.",
    "fullDescription": "Ani Apple Store is a full-stack dark luxury e-commerce web application engineered with modern React frontend architecture and a scalable Python Flask REST backend. Features an integrated live Siri AI Assistant for instant price checking in India, A18 Pro specs comparison, Grade 5 Titanium design showcase, interactive trade-in estimate calculator, Owner Portal, secure payment processing, and real-time MongoDB database updates.",
    "tags": ["React", "Python", "Flask", "MongoDB", "Tailwind CSS", "GSAP", "Siri AI", "Apple Intelligence"],
    "image": "/assets/project_ani_apple_store.png",
    "liveUrl": "https://apple-ai-mu.vercel.app/",
    "githubUrl": "https://github.com/louieandrew11-dotcom/ai-electronics-store",
    "features": [
      "Live Siri AI Assistant widget with instant iPhone prices, specs & trade-in estimates",
      "Grade 5 Titanium & A18 Pro interactive tech spec comparison engine",
      "Quick Prompts: iPhone 16 Pro Price in India, Compare 16 Pro vs 15 Pro, Trade-In Estimate",
      "Real-time inventory stock sync with MongoDB Atlas & Glassmorphism Owner Portal"
    ]
  },
  {
    "number": "PROJECT 02",
    "title": "SLEEPYGO — HOTEL & DESTINATION BOOKING",
    "subtitle": "Full-Stack Hotel Reservation Engine & City Destination Discovery",
    "description": "A sleek luxury hotel booking web platform empowering users to search, compare, and reserve over 500,000 hotel rooms across 50+ Indian cities and global destinations with instant check-in confirmation.",
    "fullDescription": "SleepyGo is a full-stack web application built for seamless hotel room reservation and travel destination discovery. Engineered with modern React frontend architecture and a scalable Python Flask REST backend. Features intelligent city location filtering, date-range check-in/check-out pickers, dynamic guest count calculators, secure user authentication (Sign In / Sign Up), real-time MongoDB inventory updates, and interactive popular destination showcases.",
    "tags": ["React", "Python", "Flask", "MongoDB", "Tailwind CSS", "Vite", "REST API"],
    "image": "/assets/project_sleepygo.png",
    "liveUrl": "https://sleep-go.vercel.app/",
    "githubUrl": "https://github.com/louieandrew11-dotcom/sleepygo-hotel-booking",
    "features": [
      "Location-based hotel search covering 500,000+ rooms across 50+ cities",
      "Interactive check-in & check-out date picker with dynamic guest count filter",
      "Real-time hotel room availability sync powered by MongoDB database backend",
      "Sleek responsive booking UI with secure Sign In / Sign Up authentication"
    ]
  },
  {
    "number": "PROJECT 03",
    "title": "DISCORD BOT SYSTEM",
    "subtitle": "High-Performance Automation & Community Analytics Engine",
    "description": "A robust Python Discord bot system managing server moderation, AI chat integration, custom music streaming, and real-time community engagement analytics.",
    "fullDescription": "Engineered with discord.py, PyMongo, and asynchronous event loops. Manages over 1,420 active Discord servers and 250k+ users with sub-20ms command latency. Features live web dashboard analytics for server administrators.",
    "tags": ["Python", "discord.py", "MongoDB", "Asyncio", "Flask API"],
    "image": "/assets/project_discord.svg",
    "liveUrl": "https://github.com/louieandrew/discord-bot-system",
    "githubUrl": "https://github.com/louieandrew/discord-bot-system",
    "features": [
      "Asynchronous event engine serving 250,000+ total users",
      "Sub-20ms command execution latency",
      "Live web dashboard for command analytics & status",
      "Automated moderation & AI chatbot features"
    ]
  },
  {
    "number": "PROJECT 04",
    "title": "DEVELOPER PORTFOLIO",
    "subtitle": "Cinematic Editorial Portfolio & 3D Parallax Experience",
    "description": "The dark luxury portfolio you are currently viewing. Built with oversized editorial typography, Lenis inertia scrolling, 3D mouse parallax, and Flask + MongoDB backend.",
    "fullDescription": "An award-worthy digital experience showcasing full-stack capabilities through cinematic animations, 3D floating profile visuals, pinned horizontal project navigation, and a robust Flask contact system with email notification engine.",
    "tags": ["React", "Vite", "GSAP", "Lenis Scroll", "Python Flask", "MongoDB"],
    "image": "/assets/project_portfolio.svg",
    "liveUrl": "#",
    "githubUrl": "https://github.com/louieandrew/developer-portfolio",
    "features": [
      "Netflix-style cinematic intro animation with joined text",
      "3D mouse parallax & virtual camera composition shift",
      "Horizontal scroll project showcase powered by GSAP ScrollTrigger",
      "Flask backend with MongoDB storage & email notifications"
    ]
  },
  {
    "number": "PROJECT 05",
    "title": "NEURAL AI SOUND MATRIX",
    "subtitle": "Real-Time Web Synthesizer & Neural Audio Generation Engine",
    "description": "Interactive Web Audio synthesizer engineered with Python PyTorch audio models, WebGL visualizers, and Flask streaming WebSocket API.",
    "fullDescription": "Neural Sound Matrix is a cutting-edge web audio workstation allowing producers to generate custom synthesizer patches using machine learning models.",
    "tags": ["Python", "Flask", "PyTorch", "Web Audio API", "React", "WebGL"],
    "image": "/assets/gallery_3.svg",
    "liveUrl": "https://github.com/louieandrew/neural-sound-matrix",
    "githubUrl": "https://github.com/louieandrew/neural-sound-matrix",
    "features": [
      "Real-time neural audio synthesis engine",
      "WebGL 3D audio waveform canvas rendering",
      "Sub-15ms WebSocket audio buffer streaming",
      "Flask REST API backend"
    ]
  },
  {
    "number": "PROJECT 06",
    "title": "CLOUD INFRASTRUCTURE DASHBOARD",
    "subtitle": "Real-Time Server Analytics & Telemetry Monitor",
    "description": "High-performance DevOps infrastructure monitoring dashboard tracking server metrics, CPU/RAM spikes, database latencies, and active connections.",
    "fullDescription": "Full-stack monitoring system built for cloud servers. Features live graph rendering, automated email alerts on high load, and real-time MongoDB database connection pooling.",
    "tags": ["React", "Python", "Flask", "MongoDB", "Recharts", "Tailwind CSS"],
    "image": "/assets/gallery_2.svg",
    "liveUrl": "https://github.com/louieandrew/cloud-telemetry-monitor",
    "githubUrl": "https://github.com/louieandrew/cloud-telemetry-monitor",
    "features": [
      "Live WebSocket server telemetry stream",
      "Automated load spike email alert system",
      "MongoDB database latency tracking",
      "Dark cybernetic UI design"
    ]
  }
]

def save_to_local_file(filepath, data):
    records = []
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                records = json.load(f)
        except Exception:
            records = []
    records.append(data)
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(records, f, indent=2, ensure_ascii=False)
    except Exception:
        try:
            tmp_path = os.path.join('/tmp', os.path.basename(filepath))
            with open(tmp_path, 'w', encoding='utf-8') as f:
                json.dump(records, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

def read_local_file(filepath):
    paths_to_try = [filepath, os.path.join('/tmp', os.path.basename(filepath))]
    for p in paths_to_try:
        if os.path.exists(p):
            try:
                with open(p, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                continue
    return []

# FULLY TRAINED MASTER SYSTEM PROMPT FOR LOUIE ANDREW S (COMPLETE PERSONAL PROFILE & PHILOSOPHY)
LOUIE_ANDREW_SYSTEM_PROMPT = """
You are Andrew Assistant, the personal AI assistant who understands Louie Andrew as a whole person — a student, creative developer, technology enthusiast, and practical builder.

### SYSTEM INSTRUCTION & MULTI-ROLE IDENTITY
Act as Louie Andrew's: Personal AI Assistant + Coding Assistant + Programming Tutor + Project Mentor + Web Development Assistant + UI/UX Advisor + AI Project Assistant + Academic Study Assistant + Debugging Assistant + GitHub/Deployment Assistant + Creative Partner.
Core Direction: Combine CODE + DESIGN + ANIMATION + AI + TECHNOLOGY into meaningful, high-impact real-world projects.

### 1. PERSONAL IDENTITY & BACKGROUND
- Full Name: Louie Andrew (Louie Andrew S)
- Degree & College: B.E. Computer Science Engineering (2024–2028), St. Joseph's College of Engineering, Chennai, India.
- Core Identity: Technology student & creative full-stack developer who enjoys web development, animation, programming, gaming, hackathons, and turning ideas into real working software.
- Languages: English, Tamil, and Tamil-English/Tanglish. Always focus on intended meaning and context rather than spelling/grammar.

### 2. CORE PHILOSOPHY & LEARNING MINDSET
- Practical Learning First: Louie learns best by building. If learning React, he builds a web app. If learning Python, he creates an automation/bot. If learning databases, he connects it to a live project.
- Step-by-Step Simple Explanations: When explaining difficult concepts, start with clear, practical step-by-step breakdowns before deep diving.
- Systematic Debugging: When fixing code errors, explain: 1) What caused the error, 2) Why it happened, 3) The exact line-by-line fix, and 4) How to avoid it in the future.
- Continuous Growth: Louie is actively growing, making mistakes, fixing bugs, participating in hackathons, and building projects step by step.

### 3. PRIVACY & IDENTITY RULES
- Preference Priority: Always prefer newer information if Louie provides updated details later.
- Strict Authenticity: NEVER invent personal facts, friend names, or unverified claims.
- Privacy First: Keep personal details private and only reference them when directly relevant.

### 4. TECHNICAL STACK & UI/UX PREFERENCES
- Languages & Frameworks: HTML5, CSS3, JavaScript (ES6+), React 18, TypeScript, Python 3, Flask, FastAPI, Node.js, Express, SQL, C, C++, Java.
- Databases & Cloud: MongoDB, MongoDB Atlas, PyMongo, MySQL 8, Firebase, Vercel, Git, GitHub.
- Automation & Bots: Discord.py (moderation, ticket systems, role verification, FiveM utilities, QR payment bots).
- UI/UX & Motion Physics: Dark luxury glassmorphism interfaces, smooth inertia scrolling, gradients, glow effects, typewriter text animations, parallax camera shifts, dynamic background canvas orbs, interactive cards.

### 5. PROJECTS & HACKATHON CONCEPTS
- Personal Developer Portfolio: Dark luxury cinematic portfolio with 3D parallax, GSAP motion, Flask backend, and AI chatbot.
- SkillForge: Educational coding platform & execution sandbox for students (React, TypeScript, Vite, Tailwind CSS).
- Ani Apple Store: Dark luxury e-commerce web app for iPhone 16 Pro with live Siri AI Assistant, Titanium spec comparison, and MongoDB sync.
- SleepyGo: Full-stack hotel reservation & destination discovery engine for 500,000+ rooms across 50+ Indian cities.
- Discord Bot System: Async event engine serving 250,000+ users across 1,420+ servers.
- Innovative Concepts: FairHire (Skills Over Stereotypes AI recruitment), University Ecosystems (College Hub), Smart Survey Systems, Neural Audio Synthesis, Cloud Infrastructure Telemetry Monitor.

### 6. GAMING INTERESTS
- Games: GTA V, GTA V FiveM Roleplay (custom FiveM maps, game settings, FiveM utility bots), BGMI/PUBG, Valorant, Free Fire, and Red Dead Redemption 2 (RDR2).

### 7. CS ACADEMIC SUBJECTS
- Core Subjects: Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems (OS), Computer Networks (CN), Computer Architecture, Software Engineering, Statistics, and Artificial Intelligence (AI).

Be helpful, intelligent, engaging, and friendly. Answer programming, technology, general knowledge, CS academic questions, and portfolio details with accuracy, empathy, and charm!
"""

def call_groq_api(prompt, history=None):
    """Calls Groq AI API (Llama 3 70B / 8B) for ultra-fast, intelligent responses."""
    raw_key = (os.getenv('GROQ_API_KEY') or '').strip()
    if not raw_key or raw_key.startswith('your_') or 'here' in raw_key:
        return None

    url = "https://api.groq.com/openai/v1/chat/completions"
    models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "llama3-8b-8192", "mixtral-8x7b-32768"]

    messages = [{"role": "system", "content": LOUIE_ANDREW_SYSTEM_PROMPT}]

    if history and isinstance(history, list):
        for item in history[-6:]:
            role = "user" if item.get("sender") == "user" else "assistant"
            text_content = item.get("text", "")
            if text_content:
                messages.append({"role": role, "content": text_content})

    messages.append({"role": "user", "content": prompt})

    for model in models:
        try:
            payload = {
                "model": model,
                "messages": messages,
                "temperature": 0.7,
                "max_tokens": 800
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode('utf-8'),
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {raw_key}',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                },
                method='POST'
            )
            with urllib.request.urlopen(req, timeout=8, context=ssl_ctx) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                choices = res_data.get('choices', [])
                if choices:
                    content = choices[0].get('message', {}).get('content', '').strip()
                    if content:
                        print(f"[Groq AI Success with model {model}]: {content[:60]}...")
                        return content
        except Exception as e:
            print(f"[Groq API Attempt Failed ({model})]: {e}")
            continue

    return None

def call_gemini_api(prompt, history=None):
    """Calls Google Gemini API for intelligent, dynamic responses."""
    api_key = (os.getenv('GEMINI_API_KEY') or os.getenv('AI_API_KEY') or '').strip()
    if not api_key or api_key.startswith('your_') or 'here' in api_key:
        return None

    endpoints = [
        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}",
        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}",
        f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={api_key}"
    ]

    contents = []
    if history and isinstance(history, list):
        for item in history[-6:]:
            role = "user" if item.get("sender") == "user" else "model"
            text_content = item.get("text", "")
            if text_content:
                contents.append({"role": role, "parts": [{"text": text_content}]})

    contents.append({"role": "user", "parts": [{"text": prompt}]})

    payload = {
        "contents": contents,
        "systemInstruction": {
            "parts": [{"text": LOUIE_ANDREW_SYSTEM_PROMPT}]
        },
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 800
        }
    }

    for url in endpoints:
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            with urllib.request.urlopen(req, timeout=6, context=ssl_ctx) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                candidates = res_data.get('candidates', [])
                if candidates:
                    parts = candidates[0].get('content', {}).get('parts', [])
                    if parts:
                        text_resp = parts[0].get('text', '').strip()
                        if text_resp:
                            print(f"[Gemini AI Success]: {text_resp[:60]}...")
                            return text_resp
        except Exception as e:
            print(f"[Gemini API Attempt Failed]: {e}")
            continue

    return None

def generate_ai_response(query, history=None):
    q = query.lower().strip()

    # Image generation intent
    if any(w in q for w in ['generate image', 'create image', 'make image', 'draw', 'photo of louie', 'picture of louie']):
        preset_options = [
            '/assets/louie_photo.jpg',
            '/assets/project_ecommerce.svg',
            '/assets/project_skillforge.svg',
            '/assets/project_discord.svg',
            '/assets/project_portfolio.svg'
        ]
        img_url = preset_options[hash(query) % len(preset_options)]
        return f"🎨 Here is your generated visual creation for '{query}':", img_url

    # 1. Attempt Groq AI API (Llama 3 70B/8B) call
    groq_reply = call_groq_api(query, history=history)
    if groq_reply:
        return groq_reply, None

    # 2. Attempt Google Gemini API call
    gemini_reply = call_gemini_api(query, history=history)
    if gemini_reply:
        return gemini_reply, None

    # 2. Comprehensive local smart fallback engine (Multi-Topic Dynamic Responses)
    # Math Calculation Engine
    math_match = re.search(r'(\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*(\d+(?:\.\d+)?)', q)
    if math_match:
        n1, op, n2 = math_match.groups()
        n1, n2 = float(n1), float(n2)
        ans = n1 + n2 if op == '+' else (n1 - n2 if op == '-' else (n1 * n2 if op == '*' else (n1 / n2 if n2 != 0 else 'Undefined')))
        return f"🔢 Calculation result: {n1} {op} {n2} = {ans}", None

    # Casual Greetings & Small Talk (Word boundary check to prevent 'yo' matching 'you'/'your')
    if re.search(r'\b(hi|hello|hey|vanakkam|sup|yo|greetings|namaste)\b', q):
        greetings = [
            "Hi there! 👋 Vanakkam! I am Andrew Assistant. How can I help you today?",
            "Hello! 🚀 Welcome to Louie Andrew S's portfolio! Ask me anything about his projects, skills, or tech!",
            "Hey! 👋 Great to chat with you! What would you like to explore today?"
        ]
        return greetings[hash(q) % len(greetings)], None

    if any(w in q for w in ['philosophy', 'how do you learn', 'learning', 'learn']):
        return "💡 Louie Andrew learns best by practical building! If learning React, he builds a web app. If learning Python, he creates an application or automation bot. If learning databases, he connects one to a live project. He prefers step-by-step simple explanations and systematic debugging.", None

    if any(w in q for w in ['hackathon', 'real-world', 'innovative', 'idea', 'problem statement']):
        return "🚀 Louie loves hackathons and turning ideas into proper projects with features, architecture, and live working demos! Explored concepts include FairHire (Skills Over Stereotypes AI recruitment), SkillForge LMS, Siri AI Store, and Smart University Ecosystems.", None

    if 'how are you' in q or 'how r u' in q or 'how do you do' in q:
        return "😊 I am doing great! Operating at 100% efficiency and ready to help. How are you doing today?", None

    if 'who are you' in q or 'what are you' in q or 'your name' in q:
        return "🤖 I am Andrew Assistant, an AI companion designed for Louie Andrew S's portfolio. I can help with programming, portfolio details, project breakdowns, and tech inquiries!", None

    if 'who made you' in q or 'who created you' in q or 'who built you' in q:
        return "⚡ I was created by Louie Andrew S using React, Python Flask, and Google Gemini AI algorithms!", None

    if 'joke' in q or 'funny' in q:
        jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "There are 10 types of people in the world: those who understand binary, and those who don't! 💻",
            "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
            "Why did the JavaScript developer wear glasses? Because he didn't C#! 👓"
        ]
        return f"😄 {jokes[hash(q) % len(jokes)]}", None

    if any(w in q for w in ['thank', 'thanks', 'thx', 'appreciate']):
        return "🙏 You're very welcome! Feel free to ask me anything else anytime!", None

    if any(w in q for w in ['bye', 'goodnight', 'see ya', 'cya']):
        return "👋 Goodbye! Have a fantastic day ahead! Come back anytime!", None

    # Portfolio & Louie Andrew S Questions
    if any(w in q for w in ['project', 'work', 'built', 'portfolio', 'showcase']):
        return (
            "🚀 Louie Andrew S has engineered 6 flagship projects:\n"
            "1. 🛒 AI Electronics E-Commerce — Luxury e-commerce with AI recommendations & real-time inventory.\n"
            "2. 💻 SkillForge Platform — Interactive in-browser developer code execution sandbox.\n"
            "3. 🤖 Discord Bot System — Async automation engine serving 250,000+ users.\n"
            "4. 🎨 Cinematic 3D Portfolio — Parallax editorial portfolio with Lenis smooth scroll.\n"
            "5. 🎵 Neural AI Sound Matrix — Web Audio synthesizer powered by PyTorch models.\n"
            "6. 📊 Cloud Telemetry Monitor — Real-time server telemetry & load spike alert engine."
        ), None

    if any(w in q for w in ['who is louie', 'about louie', 'identity', 'profile', 'louie andrew', 'bio', 'background']):
        return (
            "👨‍💻 Louie Andrew S is a passionate Computer Science Engineering student (2024–2028) at St. Joseph's College of Engineering, Chennai.\n"
            "He specializes in full-stack web development (React, Vite, Python Flask), AI systems, database design (MongoDB, SQL), and interactive motion UI (GSAP, Tailwind CSS)."
        ), None

    if any(w in q for w in ['skill', 'tech', 'python', 'stack', 'language', 'code', 'framework', 'tools']):
        return (
            "💻 Technical Expertise:\n"
            "• Languages: Python, JavaScript (ES6+), C, C++, Java, SQL, HTML5/CSS3\n"
            "• Web Frameworks: React, Vite, Python Flask, Node.js, Express\n"
            "• Styling & Motion: Tailwind CSS, GSAP, Lenis Scroll, Glassmorphism UI\n"
            "• Databases & Tools: MongoDB Atlas, MySQL, Git, GitHub, Docker, Postman"
        ), None

    if any(w in q for w in ['college', 'education', 'study', 'course', 'degree', 'st joseph', 'university']):
        return "🎓 Louie studies B.E. Computer Science Engineering at St. Joseph's College of Engineering, Chennai (2024–2028). Core focus areas: Data Structures & Algorithms, Database Management, Operating Systems, Computer Networks, and AI.", None

    if any(w in q for w in ['game', 'gaming', 'gta', 'fivem', 'bgmi', 'pubg', 'valorant', 'rdr2']):
        return "🎮 Louie is an avid gamer! Main titles include GTA V FiveM Roleplay, BGMI, Valorant, Free Fire, and Red Dead Redemption 2.", None

    if any(w in q for w in ['liva', 'mary']):
        return "❤️ Liva Mary is a very special person in Louie Andrew's life, met on the very first day of college sitting on the last bench in a green dress.", None

    if any(w in q for w in ['mithuna']):
        return "👥 Mithuna is one of Louie Andrew's close friends in college.", None

    if any(w in q for w in ['contact', 'email', 'touch', 'hire', 'reach']):
        return "📫 You can reach Louie Andrew S at: louieandrew.dev@gmail.com or connect via the contact form on this website!", None

    # Programming & Science Knowledge
    if 'python' in q:
        return "🐍 Python is a powerful high-level language famous for readability, web development with Flask/Django, data science, and AI/ML model training.", None

    if 'javascript' in q or 'js' in q:
        return "⚡ JavaScript is the backbone of web development, enabling dynamic interactive user interfaces with React and asynchronous backend servers with Node.js.", None

    if 'c++' in q or 'cpp' in q:
        return "⚡ C++ is a high-performance object-oriented programming language widely used in system software, game engines, and high-frequency algorithms.", None

    if 'java' in q:
        return "☕ Java is an enterprise-grade object-oriented language known for its platform independence (Write Once, Run Anywhere via JVM).", None

    if 'react' in q:
        return "⚛️ React is Meta's declarative JavaScript library for building component-driven, high-performance web user interfaces.", None

    if 'flask' in q:
        return "🌶️ Flask is a lightweight Python WSGI web framework perfect for constructing scalable REST APIs and full-stack web applications.", None

    if any(w in q for w in ['mongodb', 'database', 'sql']):
        return "🗄️ Databases store structured data: MongoDB provides flexible document-based NoSQL storage, while SQL handles relational tables and joins.", None

    if any(w in q for w in ['ai', 'artificial intelligence', 'machine learning', 'ml']):
        return "🤖 Artificial Intelligence (AI) and Machine Learning empower computer systems to analyze data, recognize patterns, and make intelligent decisions autonomously.", None

    if any(w in q for w in ['data structure', 'dsa', 'algorithm']):
        return "📚 Data Structures & Algorithms organize and process data efficiently (Arrays, Stacks, Queues, Linked Lists, Trees, Graphs) for optimal computational speed.", None

    if any(w in q for w in ['fairhire', 'bias', 'recruitment', 'stereotypes']):
        return "⚖️ FairHire is an AI recruitment platform concept designed around 'Skills Over Stereotypes', evaluating candidates fairly based on skills to eliminate recruitment bias.", None

    if any(w in q for w in ['skillforge', 'lms', 'sandbox']):
        return "💻 SkillForge is an interactive coding education LMS platform built with React 18, TypeScript, Vite, and Tailwind CSS allowing students to solve programming challenges with live code execution.", None

    if any(w in q for w in ['discord bot', 'ticket bot', 'moderation bot', 'fivem bot']):
        return "🤖 Louie has built high-performance Discord bots with Python and discord.py, including moderation bots, ticket systems, role verification, FiveM utilities, and QR payment integration serving over 250,000 users.", None

    if any(w in q for w in ['fivem', 'gta', 'roleplay']):
        return "🎮 Louie Andrew is deeply involved in GTA V FiveM roleplay, custom FiveM map integration, utility bots, and gaming community systems.", None

    if any(w in q for w in ['git', 'github', 'version control']):
        return "🐙 GitHub workflow: Louie uses `git status`, `git add .`, `git commit -m 'message'`, and `git push origin main` to manage repositories and deploy full-stack apps.", None

    # General Science & Knowledge Synthesizer
    if any(w in q for w in ['space', 'solar system', 'planet', 'sun', 'star', 'moon', 'galaxy']):
        return "🌌 The Solar System consists of the Sun and planetary bodies orbiting it. The universe contains billions of galaxies with stars, planets, and celestial phenomena.", None

    if any(w in q for w in ['gravity', 'physics', 'energy', 'atom', 'light', 'electricity']):
        return "⚛️ Physics studies matter, energy, and fundamental forces. Gravity holds celestial bodies together, while electromagnetic energy powers modern technology.", None

    # Dynamic Time/Date Handler
    if any(w in q for w in ['time', 'clock', 'hour', 'date', 'today']):
        now_str = datetime.datetime.now().strftime("%I:%M %p, %A, %B %d, %Y")
        return f"⏰ Current Local Time: {now_str}", None

    clean_query = query.strip()
    return f"💡 Regarding '{clean_query}': Louie Andrew S is a B.E. Computer Science Engineering student specializing in full-stack React, Python Flask, and AI systems. Feel free to ask about his 6 flagship projects, skills, or programming topics!", None


def send_email_notification(contact_record):
    """
    Sends an email notification to OWNER_EMAIL (louieandrew11@gmail.com) whenever a contact message is received.
    Supports Resend API Key, SendGrid API Key, Brevo API Key, or Gmail SMTP App Password.
    """
    to_email = os.getenv('OWNER_EMAIL', 'louieandrew11@gmail.com').strip()
    sender_name = contact_record.get('name', 'Anonymous Visitor')
    sender_email = contact_record.get('email', '')
    subject_text = contact_record.get('subject', 'Portfolio Contact Inquiry')
    message_text = contact_record.get('message', '')
    created_at = contact_record.get('created_at', datetime.datetime.now(datetime.timezone.utc).isoformat())

    email_subject = f"📬 [Portfolio Inquiry] {subject_text} - From {sender_name}"

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050508; color: #f8fafc; margin: 0; padding: 20px; }}
        .container {{ max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #334155; border-radius: 16px; padding: 32px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }}
        .badge {{ display: inline-block; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-size: 11px; font-family: monospace; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; font-weight: bold; margin-bottom: 16px; }}
        h1 {{ color: #ffffff; font-size: 24px; margin: 0 0 8px 0; letter-spacing: -0.5px; }}
        .divider {{ border: 0; border-top: 1px solid #1e293b; margin: 24px 0; }}
        .field {{ margin-bottom: 16px; }}
        .label {{ font-size: 11px; font-family: monospace; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 4px; }}
        .value {{ font-size: 15px; color: #f1f5f9; font-weight: 500; }}
        .value a {{ color: #38bdf8; text-decoration: none; }}
        .message-box {{ background: #020617; border: 1px solid #1e293b; border-left: 4px solid #38bdf8; border-radius: 12px; padding: 20px; margin-top: 20px; white-space: pre-wrap; color: #e2e8f0; font-size: 14px; line-height: 1.6; }}
        .footer {{ font-size: 12px; color: #64748b; font-family: monospace; text-align: center; margin-top: 32px; }}
      </style>
    </head>
    <body>
      <div class="container">
        <span class="badge">// NEW TRANSMISSION RECEIVED</span>
        <h1>New Portfolio Contact Message</h1>
        <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Someone submitted a message on your personal website.</p>
        
        <div class="divider"></div>
        
        <div class="field">
          <span class="label">SENDER NAME</span>
          <div class="value">{sender_name}</div>
        </div>
        
        <div class="field">
          <span class="label">SENDER EMAIL</span>
          <div class="value"><a href="mailto:{sender_email}">{sender_email}</a></div>
        </div>

        <div class="field">
          <span class="label">SUBJECT</span>
          <div class="value">{subject_text}</div>
        </div>

        <div class="field">
          <span class="label">TIMESTAMP</span>
          <div class="value">{created_at}</div>
        </div>

        <div class="field">
          <span class="label">MESSAGE CONTENT</span>
          <div class="message-box">{message_text}</div>
        </div>

        <div class="divider"></div>

        <div class="footer">
          Louie Andrew S Portfolio Automated Mailer &bull; louieandrew11@gmail.com
        </div>
      </div>
    </body>
    </html>
    """

    # 1. Resend API Integration (RESEND_API_KEY)
    resend_key = os.getenv('RESEND_API_KEY', '').strip()
    if resend_key and not resend_key.startswith('your_'):
        try:
            req = urllib.request.Request(
                "https://api.resend.com/emails",
                data=json.dumps({
                    "from": os.getenv('MAIL_FROM', 'Portfolio Contact <onboarding@resend.dev>'),
                    "to": [to_email],
                    "subject": email_subject,
                    "html": html_content,
                    "reply_to": sender_email
                }).encode('utf-8'),
                headers={
                    "Authorization": f"Bearer {resend_key}",
                    "Content-Type": "application/json"
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=8, context=ssl_ctx) as resp:
                print(f"[Email Engine]: Successfully sent message to {to_email} via Resend API.")
                return True
        except Exception as e:
            print(f"[Email Engine Warning - Resend]: {e}")

    # 2. SendGrid API Integration (SENDGRID_API_KEY)
    sendgrid_key = os.getenv('SENDGRID_API_KEY', '').strip()
    if sendgrid_key and not sendgrid_key.startswith('your_'):
        try:
            req = urllib.request.Request(
                "https://api.sendgrid.com/v3/mail/send",
                data=json.dumps({
                    "personalizations": [{"to": [{"email": to_email}]}],
                    "from": {"email": os.getenv('MAIL_FROM_EMAIL', 'noreply@portfolio.com'), "name": "Portfolio Contact"},
                    "subject": email_subject,
                    "content": [{"type": "text/html", "value": html_content}],
                    "reply_to": {"email": sender_email}
                }).encode('utf-8'),
                headers={
                    "Authorization": f"Bearer {sendgrid_key}",
                    "Content-Type": "application/json"
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=8, context=ssl_ctx) as resp:
                print(f"[Email Engine]: Successfully sent message to {to_email} via SendGrid API.")
                return True
        except Exception as e:
            print(f"[Email Engine Warning - SendGrid]: {e}")

    # 3. Brevo API Integration (BREVO_API_KEY)
    brevo_key = os.getenv('BREVO_API_KEY', '').strip()
    if brevo_key and not brevo_key.startswith('your_'):
        try:
            req = urllib.request.Request(
                "https://api.brevo.com/v3/smtp/email",
                data=json.dumps({
                    "sender": {"name": "Portfolio Contact", "email": os.getenv('MAIL_FROM_EMAIL', to_email)},
                    "to": [{"email": to_email}],
                    "subject": email_subject,
                    "htmlContent": html_content,
                    "replyTo": {"email": sender_email}
                }).encode('utf-8'),
                headers={
                    "api-key": brevo_key,
                    "Content-Type": "application/json"
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=8, context=ssl_ctx) as resp:
                print(f"[Email Engine]: Successfully sent message to {to_email} via Brevo API.")
                return True
        except Exception as e:
            print(f"[Email Engine Warning - Brevo]: {e}")

    # 4. Standard SMTP / Gmail App Password
    mail_user = os.getenv('MAIL_USERNAME', os.getenv('GMAIL_USER', to_email)).strip()
    mail_pass = os.getenv('MAIL_PASSWORD', os.getenv('GMAIL_APP_PASSWORD', '')).strip()
    mail_server = os.getenv('MAIL_SERVER', 'smtp.gmail.com').strip()
    mail_port = int(os.getenv('MAIL_PORT', 587))

    if mail_pass and not mail_pass.startswith('your_'):
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = email_subject
            msg['From'] = mail_user
            msg['To'] = to_email
            msg.add_header('reply-to', sender_email)

            text_part = MIMEText(f"From: {sender_name} ({sender_email})\nSubject: {subject_text}\n\nMessage:\n{message_text}", 'plain')
            html_part = MIMEText(html_content, 'html')
            msg.attach(text_part)
            msg.attach(html_part)

            if mail_port == 465:
                server = smtplib.SMTP_SSL(mail_server, mail_port, timeout=10)
            else:
                server = smtplib.SMTP(mail_server, mail_port, timeout=10)
                server.starttls()

            server.login(mail_user, mail_pass)
            server.sendmail(mail_user, [to_email], msg.as_string())
            server.quit()
            print(f"[Email Engine]: Successfully sent message to {to_email} via SMTP ({mail_server}).")
            return True
        except Exception as e:
            print(f"[Email Engine Warning - SMTP]: {e}")

    print(f"[Email Engine Info]: Message saved locally to messages.json. Add RESEND_API_KEY, SENDGRID_API_KEY, BREVO_API_KEY, or MAIL_PASSWORD in backend/.env to send live emails to {to_email}.")
    return False

# API Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "Louie Andrew S — Portfolio REST API",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "ai_engine": "active_dynamic_nlp_engine"
    }), 200

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    try:
        req_data = request.get_json() or {}
        name = req_data.get('name', '').strip()
        email = req_data.get('email', '').strip()
        message = req_data.get('message', '').strip()

        if not name or not email or not message:
            return jsonify({"success": False, "error": "Name, email, and message are required."}), 400

        contact_record = {
            "name": name,
            "email": email,
            "subject": req_data.get('subject', 'Portfolio Inquiry').strip(),
            "message": message,
            "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }

        save_to_local_file(MESSAGES_FILE, contact_record)

        # Dispatch email notification to target email (louieandrew11@gmail.com)
        email_sent = send_email_notification(contact_record)

        return jsonify({
            "success": True,
            "message": "Thank you! Message transmitted successfully.",
            "email_sent": email_sent,
            "recipient": os.getenv('OWNER_EMAIL', 'louieandrew11@gmail.com')
        }), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        server_custom = read_local_file(PROJECTS_FILE)
        all_projects = list(DEFAULT_FLAGSHIP_PROJECTS)
        for idx, custom_p in enumerate(server_custom):
            custom_p_copy = dict(custom_p)
            custom_p_copy["number"] = f"PROJECT 0{len(DEFAULT_FLAGSHIP_PROJECTS) + idx + 1}"
            all_projects.append(custom_p_copy)

        return jsonify({
            "success": True,
            "count": len(all_projects),
            "projects": all_projects
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/projects', methods=['POST'])
def add_project():
    try:
        req_data = request.get_json() or {}
        title = req_data.get('title', '').strip()
        description = req_data.get('description', '').strip()

        if not title or not description:
            return jsonify({"success": False, "error": "Title and description required."}), 400

        project_record = {
            "title": title.upper(),
            "subtitle": req_data.get('subtitle', 'Custom Developer Project').strip(),
            "description": description,
            "fullDescription": req_data.get('fullDescription', description).strip(),
            "tags": req_data.get('tags', ['React', 'Python', 'Flask']),
            "image": req_data.get('image', '/assets/project_portfolio.svg'),
            "liveUrl": req_data.get('liveUrl', '#'),
            "githubUrl": req_data.get('githubUrl', '#'),
            "features": req_data.get('features', ['Interactive Full-Stack Architecture']),
            "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }

        save_to_local_file(PROJECTS_FILE, project_record)

        return jsonify({
            "success": True,
            "message": "Project saved successfully!",
            "project": project_record
        }), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/generate-image', methods=['POST'])
def generate_image_route():
    try:
        req_data = request.get_json() or {}
        prompt = req_data.get('prompt', 'Louie Andrew S Avatar').strip()

        preset_options = [
            '/assets/louie_photo.jpg',
            '/assets/project_ecommerce.svg',
            '/assets/project_skillforge.svg',
            '/assets/project_discord.svg',
            '/assets/project_portfolio.svg',
            '/assets/gallery_3.svg'
        ]

        selected_img = preset_options[hash(prompt) % len(preset_options)]

        return jsonify({
            "success": True,
            "imageUrl": selected_img,
            "prompt": prompt,
            "message": f"🎨 AI Image Generated for: '{prompt}'"
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def handle_chat():
    """Dynamic Natural Language AI Engine responding to ANY user message"""
    try:
        req_data = request.get_json() or {}
        query = req_data.get('message', '').strip()
        image_attached = req_data.get('image', None)
        history = req_data.get('history', [])

        prompt = query if query else ("Image attached for analysis" if image_attached else "")
        reply_text, gen_img = generate_ai_response(prompt, history=history)

        links = None
        q_lower = query.lower()
        if any(w in q_lower for w in ['social', 'instagram', 'github', 'linkedin', 'link', 'connect', 'contact', 'email', 'social media', 'profile']):
            links = [
                { "label": "🐙 GitHub Profile", "url": "https://github.com/louieandrew11-dotcom" },
                { "label": "📸 Instagram Profile", "url": "https://www.instagram.com/ig_andrew__11_/?hl=en" },
                { "label": "💼 LinkedIn Profile", "url": "https://www.linkedin.com/in/louieandrew11/" },
                { "label": "📫 Email Louie", "url": "mailto:louieandrew.dev@gmail.com" }
            ]

        return jsonify({
            "success": True,
            "reply": reply_text,
            "generatedImage": gen_img,
            "links": links
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    print(f"==================================================")
    print(f"  LOUIE ANDREW S — PORTFOLIO BACKEND SERVER")
    print(f"  Listening on http://localhost:{port}")
    print(f"==================================================")
    app.run(host='0.0.0.0', port=port, debug=True)
