'use client';

export default function CareerPage() {
  const jobs = [
    { title: "Master Mariner / Captain", dept: "Deck Department", exp: "2+ Years as Master", icon: "⚓" },
    { title: "Chief Engineer", dept: "Engine Department", exp: "Class 1 Certificate", icon: "⚙️" },
    { title: "AB Seaman & Motorman", dept: "Deck & Engine", exp: "Watchkeeping Cert", icon: "🚢" },
  ];

  return (
    <main className="relative py-20 bg-slate-950 min-h-screen overflow-hidden text-slate-100">
      {/* Background Glow & Ocean Wave Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Floating Ship Animation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="text-4xl animate-bounce inline-block drop-shadow-[0_10px_10px_rgba(6,182,212,0.4)]">
              🚢
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Career Opportunities
          </h1>
          <p className="text-slate-400 text-lg">
            Join our pool of qualified Bangladeshi seafarers for international vessel placements.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {jobs.map((job, idx) => (
            <div 
              key={idx} 
              className="group relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-800/80 shadow-2xl hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
            >
              {/* Card Hover Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full font-semibold tracking-wide">
                    {job.dept}
                  </span>
                  <span className="text-2xl p-2 bg-slate-800/50 rounded-xl border border-slate-700/50 group-hover:scale-110 transition-transform duration-300">
                    {job.icon}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {job.title}
                </h3>
                
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-8 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Requirement: <strong className="text-slate-200">{job.exp}</strong></span>
                </div>
              </div>

              <button className="relative w-full overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group-hover:from-cyan-500 group-hover:to-blue-500 active:scale-[0.98]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Apply Now 
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Maritime Banner Feature */}
        <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -bottom-10 text-9xl opacity-5 pointer-events-none select-none">
            ⚓
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to sail with global fleets?</h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
            Submit your resume to our crewing department or get in touch directly through our contact desk for immediate officer and rating evaluations.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-lg"
          >
            Contact Operations Desk
          </a>
        </div>

      </div>
    </main>
  );
}