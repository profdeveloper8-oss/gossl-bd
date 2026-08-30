'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (err: any) {
      console.error('Error fetching gallery images:', err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-slate-100">
      {/* Background Ambient Glow & Ocean Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Floating Ship Animation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="text-4xl animate-bounce inline-block drop-shadow-[0_10px_10px_rgba(6,182,212,0.4)]">
              🚢
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Meetings & Events
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Photos and highlights from our international partner & client meetings.
          </p>
        </div>

        {/* Gallery Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="max-w-md mx-auto p-12 text-center bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl">
            <div className="text-3xl mb-3">⚓</div>
            <p className="text-slate-400 text-sm font-medium">
              এই ক্যাটাগরিতে এখনো কোনো ছবি নেই! (Images coming soon)
            </p>
          </div>
        ) : (
          /* Animated Photo Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-3xl p-3 bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Modern Hover Glow Accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-950">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <p className="text-white font-bold text-base tracking-wide drop-shadow-md">
                      {item.title}
                    </p>
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <span className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                    {item.category || 'Meeting'}
                  </span>
                  <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                    Click to view →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modern Glassmorphism Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-lg border border-slate-700"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="relative h-[60vh] sm:h-[70vh] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80">
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Image Title / Caption */}
              <div className="pt-6 pb-2 px-2 text-center">
                <h3 className="text-xl font-bold text-white mb-1">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-cyan-400 uppercase tracking-widest font-semibold">
                  Global Ocean Ship Services Limited
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}