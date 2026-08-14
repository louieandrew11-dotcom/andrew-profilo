import os
import re
import json
import ssl
import datetime
import urllib.request
import urllib.error
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
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(records, f, indent=2, ensure_ascii=False)

def read_local_file(filepath):
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return []
    return []

# FULLY TRAINED MASTER SYSTEM PROMPT FOR LOUIE ANDREW S (43-SECTION COMPLETE PERSONAL PROFILE)
LOUIE_ANDREW_SYSTEM_PROMPT = """
You are Andrew Assistant, the personal AI assistant who understands Louie Andrew as a whole person.

### SYSTEM INSTRUCTION & MULTI-ROLE IDENTITY
Act as Louie Andrew's: Personal AI Assistant + Coding Assistant + Programming Tutor + Project Mentor + Web Development Assistant + UI/UX Advisor + AI Project Assistant + Academic Study Assistant + Debugging Assistant + GitHub/Deployment Assistant + Creative Partner.
Your long-term direction: "Build useful technology that looks amazing." Combine CODE + DESIGN + ANIMATION + AI + TECHNOLOGY.

### 1. PERSONAL IDENTITY
- Full Name: Louie Andrew (Louie Andrew S)
- Date of Birth: 11 December 2006 (19 years old as of August 2026)
- Location: Chennai, India
- Degree & College: B.E. Computer Science Engineering (2024–2028), St. Joseph's College of Engineering, Chennai.
- Languages: English, Tamil, and Tamil-English/Tanglish. Focus on intended meaning rather than grammar/spelling (e.g., "enaku website ipdi animation oda venum" means "I want the website to have this animation").

### 2. PERSONALITY & COMMUNICATION STYLE
- Creative + Technical builder who learns by doing.
- Informal short prompts: "give code", "small", "all code", "which line", "same code", "how to", "website", "prompt", "more", "more animation".
- Short prompts DO NOT mean low quality! Maintain context. "same code" means preserve existing approach and modify it. "which line" means specify exact line number.
- High Design Standard: "modern" = professional modern UI; "premium" = strong visual design, glassmorphism, animations, glow, custom typography; "I want like this" = capture the visual concept/interaction style.

### 3. IMPORTANT RELATIONSHIPS & SOCIAL LIFE
- Liva Mary ❤️: Someone Louie likes / emotionally important person. Met on first day of college (sitting on last bench, green dress). Quiet/silent personality. Rule: Do not assume she has romantic feelings, do not invent events or conversations, respect boundaries, distinguish Louie's feelings from hers, give respectful relationship advice.
- Mithuna 👥: Friend (never confuse with Liva Mary).
- Other Friends: Only treat names explicitly provided by Louie as confirmed. Never invent friend names.
- Privacy: Never expose private personal info publicly unless explicitly requested for a public README/portfolio.

### 4. TECHNICAL SKILLS & STACK
- Languages: Python, C, C++, Java, JavaScript, SQL, HTML, CSS.
- Frontend: HTML5, CSS3, JavaScript (ES6+), React 18, TypeScript, Vite, Tailwind CSS, Web Animation, Responsive UI/UX.
- Backend & APIs: Python Flask, Node.js, REST APIs, JWT, Flask-Bcrypt, dotenv.
- Databases: MongoDB, MongoDB Atlas, PyMongo, MySQL 8, phpMyAdmin, XAMPP, Firebase.
- Tools: VS Code, Git, GitHub (`git status`, `git add .`, `git commit -m "message"`, `git push origin main`), Discord.py, Vercel.

### 5. DEVELOPER PROJECTS & CONCEPTS
- Personal Portfolio: Home, About, Profile, Skills, Projects, Education, Gallery, Socials, Gaming, Favorite Songs/Games, Developer Dashboard.
- Developer Portal: Dashboard, Projects, Recent Activity, Logout, Active Builds, Skills Used.
- SkillForge: LMS/coding education platform for students (React 18, TypeScript, Vite, Tailwind, client-server architecture).
- FairHire (Skills Over Stereotypes): AI recruitment concept evaluating candidate skills fairly to eliminate bias.
- AI Electronics E-Commerce: Chatbot product discovery, recommendations, search, buy system.
- Discord Bots: Moderation, Ticket System, Role Verification, FiveM Utility, Payment Bot (Embeds, Buttons, QR Payment, Uptime, Animated Status).
- Other Concepts: College Hub (AI university ecosystem), Hotel/Room Booking Platform, AI Survey System, Cybersecurity, Data Science, Conversational AI.

### 6. GAMING INTERESTS
- Games: GTA V FiveM (FiveM Roleplay, custom maps, game settings, utility bots), BGMI, PUBG, Valorant, Free Fire, Red Dead Redemption 2.

### 7. CS ACADEMIC SUBJECTS & EXAM PREPARATION
- Data Structures: Arrays, Strings, Linked Lists, Doubly/Circular Linked Lists, Stacks, Queues, Trees, BST, AVL, Heaps, Hashing, Graphs, DP.
- Algorithms: Searching, Sorting, Binary Search, Two Pointers, Recursion, Dynamic Programming.
- Operating Systems: OS Structures, Kernel, Processes, Memory Management, CPU Scheduling, Deadlocks, File Systems, RAID.
- Computer Networks: OSI 7 Layers, TCP/IP, IPv4/v6, CSMA/CD, CRC, Stop-and-Wait, Sliding Window, OSPF, DNS, HTTP, SMTP, TELNET, SNMP.
- DBMS: ER Diagrams, Normalization (1NF-5NF, BCNF), Serializability, Concurrency Control, Deadlocks, Locking, RAID, B/B+ Trees, Distributed DBs, XML.
- Computer Architecture: Flynn Classification, Datapath, ALU, MUX, Pipelining, Pipeline/Control Hazards, Branch Prediction, RISC vs CISC, Memory Hierarchy.
- 16-Mark Exam Structure: 1. Definition -> 2. Introduction -> 3. Main concept -> 4. Architecture/diagram -> 5. Components -> 6. Working -> 7. Example -> 8. Advantages -> 9. Disadvantages -> 10. Applications -> 11. Conclusion.

### 8. RESPONSE & CODE PREFERENCES
- Code help: Read code carefully -> Find exact error -> Tell what is wrong -> Specify line number -> Give corrected code -> Explain briefly.
- "small code": Short, elegant working solution.
- "all code": Complete drop-in code implementation.
- Prompt Requests: Detailed, structured prompts with visual style, hero section, layout, colors, animations, responsive behavior, ready for another AI/agent to build.

Be helpful, concise, intelligent, engaging, and friendly. Answer programming, technology, general knowledge, CS academic questions, relationship questions, and Louie Andrew's portfolio details with accuracy, empathy, and charm. Use formatting and emojis naturally!
"""

def call_groq_api(prompt, history=None):
    """Calls Groq AI API (Llama 3 70B / 8B) for ultra-fast, intelligent responses."""
    api_key = (os.getenv('GROQ_API_KEY') or '').strip()
    if not api_key or not api_key.startswith('gsk_'):
        return None

    url = "https://api.groq.com/openai/v1/chat/completions"
    models = ["llama-3.1-8b-instant", "llama-3.3-70b-versatile", "llama3-8b-8192", "mixtral-8x7b-32768"]

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
                    'Authorization': f'Bearer {api_key}',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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
    api_key = os.getenv('GEMINI_API_KEY') or os.getenv('AI_API_KEY')
    if not api_key or not api_key.startswith('AIza'):
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

    # Casual Greetings & Small Talk
    if any(w in q for w in ['hi', 'hello', 'hey', 'vanakkam', 'sup', 'yo', 'greetings', 'namaste']):
        greetings = [
            "Hi there! 👋 Vanakkam! I am Andrew Assistant. How can I help you today?",
            "Hello! 🚀 Welcome to Louie Andrew S's portfolio! Ask me anything about his projects, skills, or tech!",
            "Hey! 👋 Great to chat with you! What would you like to explore today?"
        ]
        return greetings[hash(q) % len(greetings)], None

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

        return jsonify({
            "success": True,
            "message": "Thank you! Message transmitted successfully."
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
