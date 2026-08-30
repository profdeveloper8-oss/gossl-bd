'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  LogOut, 
  RefreshCw, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Lock,
  Trash2
} from 'lucide-react';

export default function AdminPanel() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [passcode, setPasscode] = useState('');
  
  // States for Content Management
  const [heroTitle, setHeroTitle] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [siteContentStatus, setSiteContentStatus] = useState<{ [key: string]: string }>({});
  
  // States for Gallery Upload & Management
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);

  // States for User Contact Messages
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // ডিফল্ট সিক্রেট পিন কোড
  const ADMIN_PIN = '12345'; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PIN) {
      setIsAdminLoggedIn(true);
      fetchSiteContent();
      fetchContactMessages();
      fetchGalleryImages();
    } else {
      alert('ভুল পিন কোড! সঠিক পিন দিন।');
    }
  };

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) {
        console.error('Fetch error:', error.message);
        return;
      }
      if (data) {
        data.forEach((item) => {
          if (item.section_key === 'hero_title') setHeroTitle(item.content || '');
          if (item.section_key === 'contact_address') setContactAddress(item.content || '');
        });
      }
    } catch (err) {
      console.error('Error fetching site content:', err);
    }
  };

  const fetchContactMessages = async () => {
    try {
      setLoadingMessages(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase Error Details:', error.message, error.details, error.hint);
        throw error;
      }
      setContactMessages(data || []);
    } catch (err: any) {
      console.error('Error fetching contact messages:', err.message || err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      setLoadingGallery(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (err: any) {
      console.error('Error fetching gallery images:', err.message || err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleUpdateContent = async (key: string, value: string) => {
    try {
      setSiteContentStatus(prev => ({ ...prev, [key]: 'updating' }));
      const { error } = await supabase
        .from('site_content')
        .upsert({ section_key: key, content: value }, { onConflict: 'section_key' });

      if (error) {
        alert(`আপডেট করতে সমস্যা হয়েছে: ${error.message}`);
        setSiteContentStatus(prev => ({ ...prev, [key]: 'error' }));
      } else {
        alert('সফলভাবে আপডেট হয়েছে!');
        setSiteContentStatus(prev => ({ ...prev, [key]: 'success' }));
        setTimeout(() => {
          setSiteContentStatus(prev => ({ ...prev, [key]: '' }));
        }, 3000);
      }
    } catch (err: any) {
      alert(`সার্ভার এরর: ${err.message || err}`);
      setSiteContentStatus(prev => ({ ...prev, [key]: 'error' }));
    }
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert('দয়া করে একটি ছবি সিলেক্ট করুন!');

    try {
      setUploading(true);
      setMessage('');
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // ১. Supabase Storage-এ ছবি আপলোড
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, imageFile, { upsert: true });

      if (uploadError) throw uploadError;

      // ২. Public URL নেওয়া
      const { data: publicUrlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // ৩. Database-এ সেভ করা
      const { error: dbError } = await supabase.from('gallery_images').insert([
        { title, category: 'Meetings', image_url: imageUrl }
      ]);

      if (dbError) throw dbError;

      setMessage('ছবি সফলভাবে গ্যালারিতে আপলোড হয়েছে!');
      setTitle('');
      setImageFile(null);
      const fileInput = document.getElementById('admin-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // গ্যালারি লিস্ট রিফ্রেশ করা
      fetchGalleryImages();
    } catch (err: any) {
      setMessage(`এরর: ${err.message || 'Failed to upload'}`);
    } finally {
      setUploading(false);
    }
  };

  // গ্যালারি থেকে ছবি ডিলিট করার ফাংশন
  const handleDeleteImage = async (id: number, imageUrl: string) => {
    if (!confirm('আপনি কি নিশ্চিতভাবে এই ছবিটি গ্যালারি থেকে ডিলিট করতে চান?')) return;

    try {
      // ১. স্টোরেজ থেকে ফাইল রিমুভ করার চেষ্টা (যদি ইউআরএল থাকে)
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      if (fileName) {
        await supabase.storage.from('gallery').remove([fileName]);
      }

      // ২. ডেটাবেস থেকে রো ডিলিট করা
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('ছবি সফলভাবে ডিলিট করা হয়েছে!');
      fetchGalleryImages(); // লিস্ট রিফ্রেশ
    } catch (err: any) {
      alert(`ডিলিট করতে সমস্যা হয়েছে: ${err.message || err}`);
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full"
        >
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30 text-white">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-black text-white mb-2 text-center tracking-tight">Admin Login</h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6 text-center leading-relaxed">
            অ্যাডমিন প্যানেলে ঢুকতে সিক্রেট পিন কোড দিন <br/><span className="text-cyan-400 font-semibold">(ডিফল্ট: 12345)</span>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin PIN"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold py-3.5 rounded-2xl shadow-xl shadow-cyan-500/20 transition-all duration-300 text-sm"
            >
              Login to Admin
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Top Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  ⚡ GOSSL BD Admin Dashboard
                </h1>
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-slate-400 text-xs sm:text-sm">Manage website content, gallery uploads, and client inquiries seamlessly.</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </motion.div>

        {/* ১. Website Text & Info Editor */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Website Text & Info Control</h2>
              <p className="text-xs text-slate-400">Update live homepage headings and contact locations instantly.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Hero Title / Main Heading</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={heroTitle} 
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="flex-1 bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                />
                <button 
                  type="button" 
                  onClick={() => handleUpdateContent('hero_title', heroTitle)} 
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-cyan-600/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  {siteContentStatus['hero_title'] === 'updating' ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : siteContentStatus['hero_title'] === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  ) : (
                    'Update'
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Contact Address</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={contactAddress} 
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="flex-1 bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                />
                <button 
                  type="button" 
                  onClick={() => handleUpdateContent('contact_address', contactAddress)} 
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-cyan-600/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  {siteContentStatus['contact_address'] === 'updating' ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : siteContentStatus['contact_address'] === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  ) : (
                    'Update'
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ২. Gallery Direct Image Uploader */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Upload Gallery Image Direct</h2>
              <p className="text-xs text-slate-400">Add high-resolution photos directly to the meetings gallery.</p>
            </div>
          </div>

          <form onSubmit={handleGalleryUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Image Title / Caption</label>
              <input 
                type="text" 
                placeholder="যেমন: Partner Meeting in Dhaka"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Select Image File</label>
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-semibold px-5 py-2.5 rounded-xl transition-all text-xs flex items-center gap-2 shadow-sm">
                  <Upload className="w-4 h-4" />
                  Choose File
                  <input 
                    id="admin-file-input"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    required
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-slate-400 truncate max-w-xs">
                  {imageFile ? imageFile.name : 'No file chosen'}
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={uploading}
              className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold py-3.5 px-6 rounded-2xl shadow-xl shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Uploading to Database...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Image to Gallery
                </>
              )}
            </button>

            {message && (
              <div className="p-4 rounded-2xl text-sm flex items-center gap-2 border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </form>
        </motion.div>

        {/* নতুন সেকশন: Manage & Delete Gallery Images */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Manage & Delete Gallery Images</h2>
                <p className="text-xs text-slate-400">View all uploaded gallery pictures and delete unwanted ones instantly.</p>
              </div>
            </div>

            <button 
              onClick={fetchGalleryImages}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-semibold px-4 py-2 rounded-xl transition-all text-xs shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingGallery ? 'animate-spin' : ''}`} />
              Refresh Gallery
            </button>
          </div>

          {loadingGallery ? (
            <p className="text-slate-500 text-sm text-center py-6">Loading gallery images...</p>
          ) : galleryImages.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-6">No images uploaded in gallery yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img) => (
                <div key={img.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between gap-3 group">
                  <div className="relative h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                    <img 
                      src={img.image_url} 
                      alt={img.title || 'Gallery Image'} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm truncate">{img.title || 'Untitled'}</h4>
                    <span className="text-[10px] text-cyan-400 uppercase tracking-wider">{img.category || 'Meetings'}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteImage(img.id, img.image_url)}
                    className="w-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 font-semibold py-2 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Image
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ৩. User Contact Messages Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">User Contact Messages</h2>
                <p className="text-xs text-slate-400">Review inquiries and messages sent by clients.</p>
              </div>
            </div>

            <button 
              onClick={fetchContactMessages}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-semibold px-4 py-2 rounded-xl transition-all text-xs shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
              Refresh Messages
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Date</th>
                  <th className="py-3 px-4 font-bold">Name</th>
                  <th className="py-3 px-4 font-bold">Email</th>
                  <th className="py-3 px-4 font-bold">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {loadingMessages ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      Loading messages...
                    </td>
                  </tr>
                ) : contactMessages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      No messages received from users yet.
                    </td>
                  </tr>
                ) : (
                  contactMessages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4 text-slate-400 text-xs whitespace-nowrap">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 font-semibold text-white">
                        {msg.name}
                      </td>
                      <td className="py-4 px-4 text-cyan-400">
                        <a href={`mailto:${msg.email}`} className="hover:underline">
                          {msg.email}
                        </a>
                      </td>
                      <td className="py-4 px-4 text-slate-300 max-w-xs truncate">
                        {msg.message}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </main>
  );
}