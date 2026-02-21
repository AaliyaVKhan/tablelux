import Link from 'next/link';
import Navbar from '@/src/components/Navbar';
import HeroSection from '@/src/components/HeroSection';
import Footer from '@/src/components/Footer';
import { getAllCategories } from '@/src/lib/products';
import { Package, Calendar, Truck } from 'lucide-react';

const allCategories = getAllCategories();

const HOW_IT_WORKS = [
  {
    icon: Package,
    title: 'Browse & Build',
    description:
      'Explore our catalog of 35+ curated pieces across flatware, glassware, charger plates, linens, centerpieces, and serveware. Filter by tier and category.',
  },
  {
    icon: Calendar,
    title: 'Request a Quote',
    description:
      'Add items to your quote, choose your rental period, fill in your event details, and submit. We respond within 24 hours with a confirmed quote.',
  },
  {
    icon: Truck,
    title: 'We Deliver & Collect',
    description:
      'White-glove delivery to your venue, professionally cleaned and packaged. After your event, we collect everything — no cleanup required.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'I hosted a dinner party for 24 guests and TableLux made the table look like something out of a magazine. My friends couldn\'t believe I hadn\'t hired a full event planner.',
    name: 'Marcus Chen',
    role: 'Private Host · San Francisco',
  },
  {
    quote:
      'As a wedding coordinator, I\'ve worked with every rental company in the city. TableLux is the only one whose inventory photos match what actually shows up. The Baroque flatware set is breathtaking.',
    name: 'Sophia Reyes',
    role: 'Lead Coordinator · Reyes Events · Los Angeles',
  },
  {
    quote:
      'We use TableLux for our quarterly board dinners. The corporate net-30 terms and consistent quality make it the easiest line item in our events budget.',
    name: 'Diana Park',
    role: 'Director of Events · Apex Capital · New York',
  },
];

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      {/* ── Browse by Category ── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">What We Offer</p>
            <h2
              className="text-navy text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Browse by Category
            </h2>
            <p className="text-navy/60 mt-3 text-sm max-w-xl mx-auto">
              Every piece in our inventory is hand-selected, professionally cleaned, and available
              in Standard, Premium, and Luxury tiers to match your event and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((cat) => (
              <Link
                key={cat.category_id}
                href={`/catalog?category=${cat.category_id}`}
                className="group bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Gradient swatch */}
                <div className="h-40 bg-gradient-to-br from-gold via-yellow-600 to-navy flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/80 to-navy opacity-90" />
                  <span
                    className="relative z-10 text-cream text-sm tracking-widest uppercase font-semibold px-4 text-center"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {cat.category_name}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-navy/60 text-sm leading-relaxed">{cat.description}</p>
                  <p className="text-gold text-xs tracking-wider uppercase font-semibold mt-4 group-hover:underline">
                    {cat.products.length} pieces →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/catalog"
              className="inline-block bg-navy text-cream px-10 py-3.5 text-xs tracking-widest uppercase font-bold hover:bg-gold hover:text-navy transition-colors duration-200"
            >
              View Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">The Process</p>
            <h2
              className="text-cream text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <h3
                    className="text-cream text-lg font-bold mb-3"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Kind Words</p>
            <h2
              className="text-navy text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8 flex flex-col">
                <p className="text-gold text-2xl font-serif mb-4 leading-none">&ldquo;</p>
                <p className="text-navy/70 text-sm leading-relaxed flex-1 italic">{t.quote}</p>
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-navy font-bold text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                    {t.name}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gold py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-navy text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Ready to elevate your table?
          </h2>
          <p className="text-navy/70 text-sm mb-8 max-w-lg mx-auto">
            Whether you&apos;re hosting 12 or 1,200, TableLux has the inventory, the expertise,
            and the white-glove service to make it unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-navy text-cream px-10 py-3.5 text-xs tracking-widest uppercase font-bold hover:bg-navy/80 transition-colors duration-200"
            >
              Get a Quote
            </Link>
            <Link
              href="/catalog"
              className="border-2 border-navy text-navy px-10 py-3.5 text-xs tracking-widest uppercase font-bold hover:bg-navy hover:text-cream transition-colors duration-200"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
