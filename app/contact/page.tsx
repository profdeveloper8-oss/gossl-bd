'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative py-20 bg-slate-950 min-h-screen overflow-hidden text-slate-100">
      {/* Background Glow & Maritime Light Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Floating Ship Animation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="text-4xl animate-bounce inline-block drop-shadow-[0_10px_10px_rgba(6,182,212,0.4)]">
              🚢
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-slate-400 text-lg">
            Get in touch with our operations desk for inquiries and immediate assistance.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Card Accent Glow */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Contact Details */}
          <div className="space-y-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20 text-xl">
                  ⚓
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">Headquarters</h2>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <p className="font-semibold text-cyan-400 text-sm mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Chattogram Office:
                  </p>
                  <p className="text-slate-300 text-sm">Port Zone, Commercial Area, Chattogram, Bangladesh</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <p className="font-semibold text-cyan-400 text-sm mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    Dhaka Office:
                  </p>
                  <p className="text-slate-300 text-sm">Dhaka, Bangladesh</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <p className="font-semibold text-cyan-400 text-sm mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    Email:
                  </p>
                  <p className="text-slate-300 text-sm font-medium">info@gosslbd.com</p>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 border-t border-slate-800/80 pt-4">
              Global Ocean Ship Services Limited — Operating 24/7 for vessel support and maritime logistics.
            </div>
          </div>

          {/* Quick Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {success && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-medium text-center animate-fadeIn">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-sm font-medium text-center animate-fadeIn">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                placeholder="Full Name" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                placeholder="name@company.com" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea 
                rows={4} 
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none" 
                placeholder="How can we assist your vessel?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:from-cyan-500 hover:to-blue-500 active:scale-[0.98] disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? 'Sending Message...' : 'Send Message'}
                {!loading && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </span>
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}