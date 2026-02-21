'use client';

import { useState, useCallback } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import ProductCard from '@/src/components/ProductCard';
import QuoteCalculator from '@/src/components/QuoteCalculator';
import { getAllProducts, getPricingModel } from '@/src/lib/products';
import type { Product, QuoteItem, QuoteRequest, QuoteResponse } from '@/src/types';

const allProducts = getAllProducts();
const pricingModel = getPricingModel();
const weekendPeriod = pricingModel.rental_periods[0];

const EVENT_TYPES = [
  'Private Dinner Party',
  'Wedding',
  'Corporate Event',
  'Other',
] as const;

export default function QuotePage() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    event_date: '',
    event_type: EVENT_TYPES[0] as string,
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<QuoteResponse | null>(null);
  const [error, setError] = useState('');

  const addToQuote = useCallback((product: Product) => {
    setQuoteItems((prev) => {
      const existing = prev.find((i) => i.product.sku === product.sku);
      if (existing) {
        return prev.map((i) =>
          i.product.sku === product.sku
            ? { ...i, quantity: i.quantity + 12 }
            : i
        );
      }
      return [...prev, { product, quantity: 12, rental_period: weekendPeriod }];
    });
  }, []);

  const removeFromQuote = useCallback((sku: string) => {
    setQuoteItems((prev) => prev.filter((i) => i.product.sku !== sku));
  }, []);

  const handleQuantityChange = useCallback((sku: string, qty: number) => {
    setQuoteItems((prev) =>
      prev.map((i) => (i.product.sku === sku ? { ...i, quantity: qty } : i))
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (quoteItems.length === 0) {
      setError('Please add at least one item to your quote.');
      return;
    }
    if (!form.email || !form.name) {
      setError('Name and email are required.');
      return;
    }

    setSubmitting(true);
    try {
      const payload: QuoteRequest = {
        items: quoteItems,
        ...form,
      };
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }
      const data: QuoteResponse = await res.json();
      setConfirmation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <div className="bg-navy pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Build Your Order</p>
          <h1
            className="text-cream text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Get a Quote
          </h1>
          <p className="text-cream/60 mt-3 text-sm">
            Add items below, adjust quantities, then submit your details.
            We&apos;ll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* ── SECTION 1: Mini Product Browser ── */}
          <div className="mb-14">
            <h2
              className="text-navy text-2xl font-bold mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              1. Choose Your Pieces
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Click &quot;Add to Quote&quot; to add items. Adding the same item increases quantity by 12.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allProducts.map((product) => (
                <ProductCard
                  key={product.sku}
                  product={product}
                  onAddToQuote={addToQuote}
                />
              ))}
            </div>
          </div>

          {/* ── SECTION 2: Quote Calculator ── */}
          <div className="mb-14">
            <h2
              className="text-navy text-2xl font-bold mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              2. Review &amp; Adjust Your Quote
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Change quantities or rental period below. Totals update instantly.
            </p>
            <QuoteCalculator
              items={quoteItems}
              pricingModel={pricingModel}
              onQuantityChange={handleQuantityChange}
              onRemove={removeFromQuote}
            />
          </div>

          {/* ── SECTION 3: Contact Form ── */}
          <div className="mb-10">
            <h2
              className="text-navy text-2xl font-bold mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              3. Your Details
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              We&apos;ll use this to confirm availability and send your final quote.
            </p>

            {confirmation ? (
              /* ── Confirmation ── */
              <div className="bg-white border-l-4 border-gold p-8 max-w-2xl">
                <p className="text-gold text-xs tracking-widest uppercase font-semibold mb-2">
                  Quote Request Received
                </p>
                <h3
                  className="text-navy text-2xl font-bold mb-4"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  We&apos;ll be in touch within 24 hours.
                </h3>
                <p className="text-navy/70 text-sm mb-4">
                  Your quote ID is{' '}
                  <span className="font-mono font-bold text-navy bg-cream px-2 py-0.5">
                    {confirmation.quote_id}
                  </span>
                  . Keep this for your records.
                </p>
                <div className="bg-cream p-4 text-sm space-y-1 text-navy/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">${confirmation.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning Fee</span>
                    <span>${confirmation.cleaning_fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Damage Deposit (refundable)</span>
                    <span>${confirmation.damage_deposit.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy pt-1 border-t border-gray-200">
                    <span>Estimated Total</span>
                    <span>${confirmation.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Contact Form ── */
              <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 max-w-2xl space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-navy text-xs tracking-wider uppercase font-semibold mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full border border-gray-200 px-4 py-2.5 text-navy text-sm focus:outline-none focus:border-gold"
                      placeholder="Marcus Chen"
                    />
                  </div>
                  <div>
                    <label className="block text-navy text-xs tracking-wider uppercase font-semibold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full border border-gray-200 px-4 py-2.5 text-navy text-sm focus:outline-none focus:border-gold"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-navy text-xs tracking-wider uppercase font-semibold mb-1.5">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={form.event_date}
                      onChange={(e) => setForm((f) => ({ ...f, event_date: e.target.value }))}
                      className="w-full border border-gray-200 px-4 py-2.5 text-navy text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-navy text-xs tracking-wider uppercase font-semibold mb-1.5">
                      Event Type
                    </label>
                    <select
                      value={form.event_type}
                      onChange={(e) => setForm((f) => ({ ...f, event_type: e.target.value }))}
                      className="w-full border border-gray-200 px-4 py-2.5 text-navy text-sm focus:outline-none focus:border-gold bg-white"
                    >
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-navy text-xs tracking-wider uppercase font-semibold mb-1.5">
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    className="w-full border border-gray-200 px-4 py-2.5 text-navy text-sm focus:outline-none focus:border-gold resize-none"
                    placeholder="Guest count, delivery address, specific styling requests, corporate account inquiry..."
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold text-navy py-3.5 text-sm tracking-widest uppercase font-bold hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting…' : 'Submit Quote Request'}
                </button>

                <p className="text-gray-400 text-xs text-center">
                  By submitting, you agree that this is a quote request only — not a confirmed order.
                  No payment is collected at this stage.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
