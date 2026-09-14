'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ship, Anchor, Package, ArrowRight, ShieldCheck, Building2, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { supabase } from '@/lib/supabaseClient';

// Separate 3D Model Component for Hero Section (Balanced & Perfect Size)
function Hero3DLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 2.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 2); // Cyan tint back-light
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    let logoMesh: THREE.Object3D | null = null;
    const loader = new GLTFLoader();

    // Loads model from public/navy_logo.glb
    loader.load(
      '/navy_logo.glb',
      (gltf) => {
        logoMesh = gltf.scene;

        // Auto Center Mesh
        const box = new THREE.Box3().setFromObject(logoMesh);
        const center = box.getCenter(new THREE.Vector3());
        logoMesh.position.sub(center);

        scene.add(logoMesh);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model:', error);
      }
    );

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (logoMesh) {
        logoMesh.rotation.y += 0.008; // Smooth rotation
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Adjusted scale for a clean, proportionate hero look
  return <div ref={containerRef} className="w-full h-[380px] sm:h-[450px] lg:h-[500px] scale-90 sm:scale-100 flex items-center justify-center relative" />;
}

export default function Home() {
  const [heroTitle, setHeroTitle] = useState('Global Ocean Shipping Services Ltd.');
  const [heroDesc, setHeroDesc] = useState('Providing world-class shipping, husbandry, ship supply, logistics, and maritime support services across all major ports in Bangladesh.');

  useEffect(() => {
    fetchSiteContent();
  }, []);

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) {
        console.error('Supabase fetch error:', error);
        return;
      }

      if (data) {
        data.forEach((item) => {
          if (item.section_key === 'hero_title' && item.content) {
            setHeroTitle(item.content);
          }
          if ((item.section_key === 'hero_desc' || item.section_key === 'contact_address') && item.content) {
            setHeroDesc(item.content);
          }
        });
      }
    } catch (err) {
      console.error('Error fetching site content:', err);
    }
  };

  const services = [
    {
      icon: Ship,
      title: 'Ship Supply & Stores',
      desc: 'Complete provision, deck, engine, and safety store deliveries for sea-going vessels at Chattogram and Mongla ports.',
    },
    {
      icon: Anchor,
      title: 'Husbandry & Port Services',
      desc: 'Smooth port clearance, crew sign-on/sign-off, medical attendance, and administrative support for ship owners.',
    },
    {
      icon: Package,
      title: 'Maritime Logistics',
      desc: 'Customs clearance, spare parts handling, and fast freight forwarding for urgent vessel operational requirements.',
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* 1. White Hero Section with Modernized Surroundings */}
      <section className="relative bg-gradient-to-b from-white via-cyan-50/20 to-white pt-24 pb-20 lg:pt-32 lg:pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        {/* Animated Hero Wave */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 left-0 w-[200%] h-48 bg-repeat-x"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z' fill='%2306b6d4'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: '1200px 120px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            {/* Updated Badge Design for Light Theme */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Reliable Maritime Partner in Bangladesh
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-6 text-slate-900">
              <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                {heroTitle}
              </span>
            </h1>
            
            <p className="text-slate-600 text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-2xl">
              {heroDesc} Established in December 2015 and licensed by the Department of Shipping (DoS) since April 2016, providing professional seafarer recruitment, crew management, and maritime personnel solutions.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/services"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-cyan-600/25 transition flex items-center gap-2 text-base"
                >
                  Our Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold px-7 py-3.5 rounded-xl transition text-base shadow-sm"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Perfectly Sized 3D Canvas Container with Modern Glow Backdrops */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Ambient Backlight Glow Effects */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-full blur-[80px] -z-10 animate-pulse" />
            <div className="absolute -inset-4 bg-cyan-500/5 rounded-3xl blur-2xl -z-10" />
            
            <div className="w-full bg-white/40 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-4 shadow-2xl shadow-cyan-950/5">
              <Hero3DLogo />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview & Credentials Banner */}
      <section className="py-16 bg-gradient-to-r from-slate-50 via-cyan-50/30 to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 text-cyan-600 rounded-xl shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">SRPS Licensed (DoS)</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Licensed by the Department of Shipping, Bangladesh since April 2016 (Established Dec 2015).</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">ISO 9001:2015 Certified</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Achieved quality management certification in 2017 with full alignment to MLC 2006 welfare standards.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-teal-500/10 text-teal-600 rounded-xl shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Global Partnerships</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Connecting skilled Bangladeshi seafarers with international shipowners and global maritime operators.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. White Section with Subtle Wave Texture & Transparent Glass Cards */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Soft, Light Wave Textures in White Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-0 w-[200%] h-64 bg-repeat-x"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,40 C200,110 450,-10 700,80 C900,150 1050,30 1200,60 L1200,120 L0,120 Z' fill='%23e0f2fe'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: '1200px 120px',
            }}
          />
          <motion.div
            animate={{ x: [-1200, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-10 left-0 w-[200%] h-64 bg-repeat-x opacity-60"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z' fill='%23bae6fd'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: '1200px 120px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Core Maritime Solutions
            </h2>
            <p className="text-slate-600 text-base font-medium">
              Delivering comprehensive, end-to-end maritime services tailored to global shipping lines and vessel operators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -10 }}
                  className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-cyan-950/5 hover:shadow-2xl hover:border-cyan-500/50 hover:bg-white/90 transition-all group"
                >
                  <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CTA Section */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Need Immediate Vessel Support?</h2>
            <p className="text-slate-300 text-base">Get in touch with our 24/7 operational team today.</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition whitespace-nowrap block"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}