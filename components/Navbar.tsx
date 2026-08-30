'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Procedure', href: '/procedure' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Career', href: '/career' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-58 h-16">
            <Image
              src="/logo.png"
              alt="GOSSL BD Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? 'text-cyan-600 font-bold'
                    : 'text-slate-700 hover:text-cyan-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-md flex items-center gap-2"
        >
          Get Quote &rarr;
        </Link>
      </div>
    </header>
  );
}