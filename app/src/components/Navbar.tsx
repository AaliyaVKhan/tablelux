'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy text-cream shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-gold text-2xl font-bold tracking-widest"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}
          >
            TABLELUX
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-cream hover:text-gold transition-colors text-sm tracking-wider uppercase"
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className="text-cream hover:text-gold transition-colors text-sm tracking-wider uppercase"
          >
            Catalog
          </Link>
          <Link
            href="/quote"
            className="bg-gold text-navy px-5 py-2 text-sm tracking-wider uppercase font-semibold hover:bg-gold-light transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-cream hover:text-gold transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          <Link
            href="/"
            className="text-cream hover:text-gold transition-colors text-sm tracking-wider uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className="text-cream hover:text-gold transition-colors text-sm tracking-wider uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Catalog
          </Link>
          <Link
            href="/quote"
            className="bg-gold text-navy px-5 py-2 text-sm tracking-wider uppercase font-semibold text-center hover:bg-gold-light transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
