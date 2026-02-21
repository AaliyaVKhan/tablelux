import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">
          Premium Event Rental Collections
        </p>

        {/* Headline */}
        <h1
          className="text-cream text-5xl md:text-7xl font-bold leading-tight mb-6"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          The Table Sets
          <br />
          the Tone.
        </h1>

        {/* Gold Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gold" />
          <div className="w-2 h-2 bg-gold rotate-45" />
          <div className="h-px w-16 bg-gold" />
        </div>

        {/* Subheadline */}
        <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Premium dinner rental collections for moments that matter. Crystal, gold flatware,
          Belgian linen, and statement centerpieces — delivered to your door.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/catalog"
            className="bg-gold text-navy px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-gold-light transition-colors"
          >
            Browse Catalog
          </Link>
          <Link
            href="/quote"
            className="border border-gold text-gold px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-gold/10 transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="mt-20 flex flex-col items-center gap-2 text-cream/30">
          <div className="w-px h-12 bg-gold/30" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}
