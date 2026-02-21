'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3
              className="text-gold text-lg font-bold tracking-widest mb-4 uppercase"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              TableLux
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              TableLux is the premier luxury tableware rental service for discerning hosts,
              professional wedding planners, and corporate event managers across the United States.
              Every piece is curated, professionally cleaned, and delivered to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Catalog', href: '/catalog' },
                { label: 'Get a Quote', href: '/quote' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-gold text-sm transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              Join the List
            </h4>
            <p className="text-cream/70 text-sm mb-4 leading-relaxed">
              New collections, seasonal lookbooks, and planning guides — delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/10 border border-white/20 text-cream placeholder-cream/40 px-4 py-2.5 text-sm focus:outline-none focus:border-gold w-full"
              />
              <button
                type="submit"
                className="bg-gold text-navy px-4 py-2.5 text-xs tracking-widest uppercase font-bold hover:bg-gold-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-cream/40 text-xs">
          <p>© {new Date().getFullYear()} TableLux. All rights reserved.</p>
          <p className="tracking-wider">Premium Tableware Rentals · USA</p>
        </div>
      </div>
    </footer>
  );
}
