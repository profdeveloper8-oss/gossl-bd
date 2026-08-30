'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Anchor, ShieldCheck, Truck, Fuel, ArrowRight, Compass } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: "Ship Supply & Stores",
      desc: "Fresh provisions, deck/engine stores, safety equipment, and bonded stores at Chattogram & Mongla ports with 24/7 responsiveness.",
      icon: <Anchor className="w-8 h-8 text-cyan-500" />,
      tag: "Essential Supplies"
    },
    {
      title: "Husbandry & Crew Services",
      desc: "Seamless crew embarkation/disembarkation, fast-track visa processing, comfortable hotel transport, and professional medical assistance.",
      icon: <ShieldCheck className="w-8 h-8 text-teal-500" />,
      tag: "Crew Care"
    },
    {
      title: "Maritime Logistics & Clearance",
      desc: "Expert customs brokerage, air/sea spare parts logistics, and fast transit delivery directly to vessel side without delays.",
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      tag: "Fast Transit"
    },
    {
      title: "Bunker & Technical Support",
      desc: "Reliable bunker supply coordination, technical survey assistance, and specialized underwater inspection support.",
      icon: <Fuel className="w-8 h-8 text-indigo-500" />,
      tag: "Technical Expert"
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Hero Section with Maritime Background & Glow Animation */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/60">
        {/* Background Ship/Ocean Themed Glow Effect */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-6"
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
            Global Maritime Excellence in Bangladesh
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6"
          >
            Our Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">Maritime Services</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Tailored, fast, and reliable maritime operations designed for global shipping lines across Chattogram and Mongla ports.
          </motion.p>
        </div>
      </section>

      {/* Services Cards Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl hover:border-cyan-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Modern Glow on Hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

              <div>
                {/* Top Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/50 group-hover:bg-cyan-500/10 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700/60">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  {item.desc}
                </p>
              </div>

              {/* Action Button */}
              <div>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:text-cyan-300 transition-colors"
                >
                  Request details 
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/30 p-8 sm:p-12 text-center shadow-2xl"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Need Custom Port Operation Support?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8">
              Our expert team is available 24/7 to handle your vessel requirements instantly with maximum efficiency.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
            >
              Contact Our Operations Team
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}