import React, { useState } from 'react';
import { Send, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import SuccessModal from './SuccessModal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    // 1. Direct Web3Forms API transmission to louieandrew11@gmail.com
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '858585b3-8f2e-4859-8092-234706398a27',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry from Website',
          message: formData.message,
          from_name: 'Louie Andrew S Portfolio',
        }),
      });
    } catch (web3Err) {
      console.warn('Web3Forms email delivery notice:', web3Err);
    }

    // 2. Save message locally to Python Flask REST backend database
    const endpoints = ['http://localhost:5000/api/contact', '/api/contact'];
    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData),
        });
        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          break;
        }
      } catch {
        // Try next endpoint
      }
    }

    // Reset form and show success modal without launching external mailto handlers
    setIsSuccessOpen(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <>
      <section
        id="contact"
        className="relative w-full py-28 px-6 md:px-12 lg:px-20 bg-[#050507] overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto z-10 relative">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase block mb-2">
              // 07. TRANSMIT MESSAGE
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif tracking-tighter uppercase text-white leading-none text-glow">
              LET'S BUILD <br />
              <span className="text-outline">SOMETHING</span> <br />
              TOGETHER.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open for Opportunities &amp; Collaborations</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Have an exciting project or idea in mind?
                </h3>
                <p className="text-sm text-white/70 font-sans leading-relaxed font-light">
                  Whether you need a modern web application, high-performance Python backend, GSAP animations, or custom software solutions, let's create something extraordinary.
                </p>
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-xs font-mono text-white/40 block">DIRECT INQUIRIES:</span>
                  <a
                    href="mailto:louieandrew11@gmail.com"
                    className="text-sm font-mono text-cyan-300 hover:underline block"
                  >
                    louieandrew11@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Glass Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 space-y-6 shadow-2xl"
              >
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-white/60 tracking-wider uppercase block">
                      NAME *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-white/60 tracking-wider uppercase block">
                      EMAIL *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-mono text-white/60 tracking-wider uppercase block">
                    SUBJECT
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Hiring"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-white/60 tracking-wider uppercase block">
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry..."
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl bg-white text-[#050507] font-bold text-xs font-mono tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:scale-[1.01] active:scale-95 disabled:opacity-50 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </>
  );
}
