'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, Award, Quote } from 'lucide-react';

export default function AboutPage() {
  const leaders = [
    {
      title: "Message from The Chairman",
      name: "Kazi Abdul Wadood",
      designation: "Chairman",
      qualification: "B.Sc (CU), HRD, Sales & Marketing (Dhaka)",
      mobile: "+8801782666777",
      displayMobile: "+880 1782666777",
      email: "kaw@globaloceanssl.com",
      image: "/chairman.jpeg",
      message:
        "Bangladesh is a seafaring nation with a history of thousand years. Bangladesh seafarers have proved their capability through their skill and professionalism. I have been working with these very skilled and professional people for the last ten years and found that they are capable and at par with any other nationality. As a founding member of Global Ocean Shipping Services Ltd., my intention was to promote them to the global market. Our goal is to provide the maximum possible support to vessel owners while creating new opportunities for our seafarers.",
      bio: "Engaged in the crewing business in Bangladesh for over a decade with strong connections to local authorities and international manning businesses. Previously owner of Sea King Marine Services and Marine Hive Ltd.",
    },
    {
      title: "Message from The Managing Director",
      name: "Engr. Mahabub Alam Sarker",
      designation: "Managing Director",
      qualification: "B.Sc in Computer Science & Engineering",
      mobile: "+8801819090696",
      displayMobile: "+880 01819-090696",
      email: "masarkar@globaloceanssl.com",
      image: "/md.jpeg",
      message:
        "At Global Ocean Shipping Services Ltd., we have an extensive range of solutions for all vessel segments. We offer crew management services as you want and when you need them. We are in the business of attracting, developing, and retaining the best set of crew for you. We use a unique online-based crew management system to facilitate crew joining process monitoring with ease and smoothness.",
      bio: "Completed graduation in Computer Science & Engineering with extensive technical, engineering, and corporate experience. Specializes in development and implementation of technical and project strategies.",
    },
  ];

  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            Leadership & Vision
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 mb-4">
            Messages from Our Executive Board
          </h1>
          <p className="text-slate-400 text-base">
            Guiding Global Ocean Ship Services Limited with decades of maritime experience, technical innovation, and integrity.
          </p>
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl backdrop-blur-sm"
            >
              <div>
                {/* Section Title */}
                <div className="flex items-center gap-2 text-cyan-400 mb-6 font-semibold text-sm">
                  <Quote className="w-5 h-5 text-cyan-400 rotate-180" />
                  <span>{leader.title}</span>
                </div>

                {/* Main Message */}
                <p className="text-slate-300 italic text-sm sm:text-base leading-relaxed mb-8 bg-slate-950/50 p-5 rounded-2xl border border-slate-800/80">
                  "{leader.message}"
                </p>

                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                  <div className="relative w-24 h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/30 flex-shrink-0 bg-slate-800">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white text-center sm:text-left">{leader.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium text-center sm:text-left">{leader.designation}</p>
                    <p className="text-slate-400 text-xs mt-1 flex items-center justify-center sm:justify-start gap-1">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      {leader.qualification}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {leader.bio}
                </p>
              </div>

              {/* Interactive Contact Links */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                <a 
                  href={`tel:${leader.mobile}`} 
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>{leader.displayMobile}</span>
                </a>
                <a 
                  href={`mailto:${leader.email}`} 
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{leader.email}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}