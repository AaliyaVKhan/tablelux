import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import ProductCard from '@/src/components/ProductCard';
import { getAllProducts, getAllCategories } from '@/src/lib/products';
import type { Tier } from '@/src/types';
import Link from 'next/link';

type SearchParams = {
  category?: string | string[];
  tier?: string | string[];
};

function toArray(val: string | string[] | undefined): string[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const selectedCategories = toArray(params.category);
  const selectedTiers = toArray(params.tier);

  const allProducts = getAllProducts();
  const allCategories = getAllCategories();
  const tiers: Tier[] = ['STD', 'PRE', 'LUX'];
  const tierLabels: Record<Tier, string> = { STD: 'Standard', PRE: 'Premium', LUX: 'Luxury' };

  const filtered = allProducts.filter((p) => {
    const catMatch =
      selectedCategories.length === 0 || selectedCategories.includes(p.category_id);
    const tierMatch = selectedTiers.length === 0 || selectedTiers.includes(p.tier);
    return catMatch && tierMatch;
  });

  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <div className="bg-navy pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Our Inventory</p>
          <h1
            className="text-cream text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The Catalog
          </h1>
          <p className="text-cream/60 mt-3 text-sm">
            {allProducts.length} pieces across {allCategories.length} categories. All transparent pricing.
          </p>
        </div>
      </div>

      <div className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <form method="GET" action="/catalog" className="bg-white border border-gray-100 p-6">
              <h2 className="text-navy font-bold text-sm tracking-widest uppercase mb-6">
                Filter
              </h2>

              {/* Category */}
              <div className="mb-8">
                <h3 className="text-gold text-xs tracking-wider uppercase font-semibold mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <label key={cat.category_id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="category"
                        value={cat.category_id}
                        defaultChecked={selectedCategories.includes(cat.category_id)}
                        className="accent-gold"
                      />
                      <span className="text-navy text-sm group-hover:text-gold transition-colors">
                        {cat.category_name}
                      </span>
                      <span className="text-gray-400 text-xs ml-auto">
                        ({cat.products.length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tier */}
              <div className="mb-8">
                <h3 className="text-gold text-xs tracking-wider uppercase font-semibold mb-3">
                  Tier
                </h3>
                <div className="space-y-2">
                  {tiers.map((tier) => (
                    <label key={tier} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="tier"
                        value={tier}
                        defaultChecked={selectedTiers.includes(tier)}
                        className="accent-gold"
                      />
                      <span className="text-navy text-sm group-hover:text-gold transition-colors">
                        {tierLabels[tier]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Note */}
              <div className="bg-cream border border-gold/20 p-3 mb-6">
                <p className="text-navy/70 text-xs leading-relaxed">
                  All prices shown are <span className="font-semibold text-gold">weekend rate</span>{' '}
                  (Fri–Mon). Week rates are 1.8× and Extended (30-day) rates are 3×.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-navy text-cream py-2.5 text-xs tracking-widest uppercase font-semibold hover:bg-gold hover:text-navy transition-colors cursor-pointer"
              >
                Apply Filters
              </button>

              {(selectedCategories.length > 0 || selectedTiers.length > 0) && (
                <Link
                  href="/catalog"
                  className="block text-center text-gold text-xs tracking-wider uppercase mt-3 hover:underline"
                >
                  Clear Filters
                </Link>
              )}
            </form>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-navy/60 text-sm">
                <span className="font-bold text-navy">{filtered.length}</span> results
                {selectedCategories.length > 0 || selectedTiers.length > 0
                  ? ' (filtered)'
                  : ' — full catalog'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  No products match your filters.
                </p>
                <Link href="/catalog" className="text-gold text-sm hover:underline">
                  Clear all filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.sku}
                    product={product}
                    // In catalog view, "Add to Quote" navigates to quote page
                    onAddToQuote={undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
