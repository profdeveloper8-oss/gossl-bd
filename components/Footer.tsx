import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-12 pb-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold text-brand-cyan mb-3">GOSSL BD</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Global Ocean Ship Services Limited - Leading Maritime & Shipping Solutions Provider in Bangladesh.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link href="/" className="hover:text-brand-cyan">Home</Link></li>
            <li><Link href="/about" className="hover:text-brand-cyan">About Us</Link></li>
            <li><Link href="/services" className="hover:text-brand-cyan">Services</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Services</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Ship Supply & Husbandry</li>
            <li>Maritime Logistics</li>
            <li>Crew Management</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Contact</h4>
          <p className="text-sm text-slate-300">Chattogram & Dhaka, Bangladesh</p>
          <p className="text-sm text-slate-300 mt-1">Email: info@gosslbd.com</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 pt-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} GOSSL BD. All rights reserved.
      </div>
    </footer>
  );
}