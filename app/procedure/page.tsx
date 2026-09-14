'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, HelpCircle, Anchor, Navigation, Compass } from 'lucide-react';

export default function ProceduresPage() {
  const steps = [
    { num: "01", title: "ACCREDITATION", desc: "Refers to acceptance of foreign principal to engage Bangladeshi seafarers with international maritime standard compliance." },
    { num: "02", title: "PRINCIPAL", desc: "Refers to foreign entity engaging seafarers through a licensed manning agency for ship crewing operations." },
    { num: "03", title: "SHIP OWNER", desc: "Refers to shipowner or authorized party taking over ship's operation and crew safety responsibilities." },
    { num: "04", title: "ENROLLMENT", desc: "Refers to the administration of a vessel by accredited principal for employing qualified seafarers." },
    { num: "05", title: "REGULATION", desc: "Refers to Director General Shipping regulations, ISO 9001:2015 standards, and Maritime Labour Convention (MLC 2006) guidelines on seafarer recruitment." },
    { num: "06", title: "DEPLOYMENT", desc: "Refers to licensed manning agency (DoS License since April 2016) approved to recruit, train, and officially deploy seafarers worldwide." },
  ];

  const faqs = [
    { q: "What services does GOSSL BD provide?", a: "We provide professional seafarer recruitment, crew management, and maritime personnel solutions to the international shipping industry[cite: 1]." },
    { q: "What compliance standards do you follow?", a: "We operate under an ISO 9001:2015 Quality Management System and adhere strictly to MLC 2006 and Department of Shipping (DoS) guidelines[cite: 1]." },
    { q: "How are emergency crew replacements handled?", a: "Our dedicated professional team ensures structured recruitment, verification, documentation, and efficient crew deployment[cite: 1]." },
  ];

  return (
    <main className="py-20 bg-slate-950 text-slate-100 min-h-screen overflow-hidden relative">
      {/* 3D Immersive Ambient Background Lights & Floating Ship Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating 3D Navigation Watermark Icons */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 right-12 text-cyan-500/20 pointer-events-none hidden lg:block"
      >
        <Anchor className="w-36 h-36" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-96 left-8 text-blue-500/15 pointer-events-none hidden lg:block"
      >
        <Navigation className="w-32 h-32" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-cyan-500/10">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
            Standard Procedures
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Efficient Crewing, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
              One Step at a Time
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed font-normal">
            From selection to deployment, we focus on efficiency, safety, quality management, and ultimate client satisfaction[cite: 1].
          </p>
        </motion.div>

        {/* Timeline Animated 3D Glassmorphism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle top light reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 rounded-2xl flex items-center justify-center text-lg font-black mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                {step.title}
                <Anchor className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </h3>
              <p className="text-slate-400 text-base leading-relaxed font-normal">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/80 p-8 sm:p-14 rounded-3xl shadow-2xl border border-slate-800 text-white relative overflow-hidden"
        >
          {/* Decorative background glowing orb */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-center gap-2 mb-4 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1 rounded-full w-fit mx-auto shadow-inner">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Got Questions?</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-950/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <h4 className="font-bold text-white text-base leading-snug">{faq.q}</h4>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed pl-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}