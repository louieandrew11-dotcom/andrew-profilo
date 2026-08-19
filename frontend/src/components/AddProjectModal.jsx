import React, { useState } from 'react';
import { X, Plus, Upload, Globe, Link, Sparkles } from 'lucide-react';

export default function AddProjectModal({ isOpen, onClose, onAddProject }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    fullDescription: '',
    image: '/assets/project_portfolio.svg',
    liveUrl: '',
    githubUrl: '',
    tagsStr: 'React, Python, Flask, Tailwind CSS',
    featuresStr: 'Custom Full-Stack Feature, Responsive UI, Cloud Storage',
  });

  const [previewImage, setPreviewImage] = useState('/assets/project_portfolio.svg');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    setIsSubmitting(true);

    const tags = formData.tagsStr.split(',').map((t) => t.trim()).filter(Boolean);
    const features = formData.featuresStr.split(',').map((f) => f.trim()).filter(Boolean);

    const newProject = {
      title: formData.title.toUpperCase(),
      subtitle: formData.subtitle || 'Custom Developer Project',
      description: formData.description,
      fullDescription: formData.fullDescription || formData.description,
      tags: tags.length > 0 ? tags : ['React', 'Python', 'Flask'],
      image: formData.image || previewImage,
      liveUrl: formData.liveUrl || '#',
      githubUrl: formData.githubUrl || '#',
      features: features.length > 0 ? features : ['Interactive Full-Stack Architecture'],
    };

    try {
      // POST to Flask backend server for permanent database storage
      const endpoints = ['http://localhost:5000/api/projects', '/api/projects'];
      let projectSaved = false;
      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(newProject),
          });
          const contentType = res.headers.get('content-type') || '';
          if (res.ok && contentType.includes('application/json')) {
            const data = await res.json();
            if (data.success && data.project) {
              onAddProject(data.project);
              projectSaved = true;
              break;
            }
          }
        } catch {
          // Continue to next endpoint
        }
      }
      if (!projectSaved) {
        onAddProject(newProject);
      }
    } catch (err) {
      console.warn('Backend server unreachable, storing locally:', err);
      onAddProject(newProject);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  const presetImages = [
    { label: 'Developer Portrait', url: '/assets/louie_photo.jpg' },
    { label: 'Event Lounge', url: '/assets/louie_lounge.jpg' },
    { label: 'Rooftop Sunset', url: '/assets/louie_sunset.jpg' },
    { label: 'Coastal Beach', url: '/assets/louie_beach.jpg' },
    { label: 'Argentina Jersey', url: '/assets/louie_argentina.jpg' },
    { label: 'Full-Length Mirror', url: '/assets/louie_mirror.jpg' },
  ];

  return (
    <div
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[999999] bg-[#030305]/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn overflow-y-auto overscroll-contain"
    >
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-amber-500/40 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] space-y-6 my-auto">
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white border border-white/20 transition-all shadow-xl group"
        >
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>PERMANENT SERVER STORAGE // PUBLISH CASE STUDY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-tight text-white text-glow">
            ADD NEW <span className="text-outline-gold">PROJECT</span>
          </h2>
          <p className="text-xs font-mono text-white/60">
            Upload your project photos and links. Saves permanently to the Flask database server.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Project Title & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-amber-300 uppercase tracking-widest mb-1.5 font-bold">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. AI SMART WEB STORE"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5 font-bold">
                Subtitle / Tagline
              </label>
              <input
                type="text"
                name="subtitle"
                placeholder="e.g. Python & React E-Commerce System"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>
          </div>

          {/* Upload Project Image File / Preview */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-amber-300 uppercase tracking-widest font-bold">
              Project Web Photo / Screenshot *
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* File Drag/Drop Picker */}
              <div className="sm:col-span-8">
                <label className="flex items-center justify-center space-x-3 px-6 py-4 rounded-xl glass-card border border-dashed border-amber-500/50 hover:border-amber-400 cursor-pointer transition-all group text-center shadow-lg">
                  <Upload className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono text-white/90 font-semibold">
                    CHOOSE FILE FROM COMPUTER
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Live Preview Screen */}
              <div className="sm:col-span-4 h-20 rounded-xl overflow-hidden glass-panel border border-amber-500/40 relative flex items-center justify-center shadow-lg">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-2 text-[9px] font-mono text-amber-300 bg-black/70 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">
                  LIVE PREVIEW
                </span>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] font-mono text-white/40 uppercase mr-1">PRESETS:</span>
              {presetImages.map((p) => (
                <button
                  type="button"
                  key={p.label}
                  onClick={() => {
                    setPreviewImage(p.url);
                    setFormData((prev) => ({ ...prev, image: p.url }));
                  }}
                  className={`px-3 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                    formData.image === p.url
                      ? 'bg-amber-400 text-black border-amber-400 font-bold'
                      : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono text-amber-300 uppercase tracking-widest mb-1.5 font-bold">
              Project Description *
            </label>
            <textarea
              name="description"
              rows="3"
              required
              placeholder="Describe your web application features, architecture, and technology..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-amber-400 shadow-inner"
            />
          </div>

          {/* Web Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5 font-bold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Web Link (Live Website URL)</span>
              </label>
              <input
                type="url"
                name="liveUrl"
                placeholder="https://apple-ai-mu.vercel.app/"
                value={formData.liveUrl}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-amber-300 uppercase tracking-widest mb-1.5 font-bold flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-amber-300" />
                <span>GitHub Repository URL</span>
              </label>
              <input
                type="url"
                name="githubUrl"
                placeholder="https://github.com/louieandrew/project"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <label className="block text-xs font-mono text-white/60 uppercase tracking-widest mb-1.5 font-bold">
              Tech Stack (Comma separated)
            </label>
            <input
              type="text"
              name="tagsStr"
              placeholder="React, Python, Flask, MongoDB, Tailwind CSS"
              value={formData.tagsStr}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full glass-panel text-white/70 hover:text-white font-mono text-xs tracking-wider"
            >
              CANCEL
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-extrabold text-xs font-mono tracking-widest uppercase flex items-center gap-2 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'SAVING TO SERVER...' : 'SAVE PERMANENTLY TO SERVER'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
