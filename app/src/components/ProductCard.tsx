'use client';

import type { Product } from '@/src/types';

const tierConfig = {
  STD: {
    label: 'Standard',
    className: 'bg-gray-200 text-gray-700',
  },
  PRE: {
    label: 'Premium',
    className: 'bg-gold/20 text-yellow-800',
  },
  LUX: {
    label: 'Luxury',
    className: 'bg-gold text-navy',
  },
} as const;

interface ProductCardProps {
  product: Product;
  onAddToQuote?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToQuote }: ProductCardProps) {
  const tier = tierConfig[product.tier];

  return (
    <div className="group bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image Placeholder — gold-to-navy gradient */}
      <div className="h-52 bg-gradient-to-br from-gold via-yellow-600 to-navy flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/80 to-navy opacity-90" />
        <span
          className="relative z-10 text-cream/90 text-xs tracking-widest uppercase font-semibold px-4 text-center"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {product.category_name}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* SKU */}
        <p className="text-gray-400 text-xs tracking-wider mb-2 font-mono">{product.sku}</p>

        {/* Name */}
        <h3
          className="text-navy font-bold text-base leading-snug mb-3 flex-1"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {product.name}
        </h3>

        {/* Tier Badge */}
        <div className="mb-3">
          <span className={`text-xs px-2 py-1 font-semibold tracking-wider uppercase ${tier.className}`}>
            {tier.label}
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-navy font-bold text-lg">
            ${product.price_per_piece_weekend.toFixed(2)}
          </span>
          <span className="text-gray-500 text-sm"> / piece · weekend</span>
        </div>

        {/* Add to Quote */}
        <button
          onClick={() => onAddToQuote?.(product)}
          className="w-full bg-navy text-cream py-2.5 text-xs tracking-widest uppercase font-semibold hover:bg-gold hover:text-navy transition-colors duration-200 cursor-pointer"
        >
          Add to Quote
        </button>
      </div>
    </div>
  );
}
