import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught an exception:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030305] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
          <div className="max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-amber-500/30 space-y-6 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-black uppercase text-white tracking-tight">
                EXPERIENCE RESET REQUIRED
              </h2>
              <p className="text-xs font-mono text-emerald-400">
                SYSTEM TELEMETRY RECOVERY
              </p>
            </div>

            <p className="text-xs text-white/70 font-sans leading-relaxed">
              A temporary animation or layout glitch was caught safely. Click below to restore the interactive experience.
            </p>

            <button
              onClick={this.handleReload}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-bold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RELOAD EXPERIENCE</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
