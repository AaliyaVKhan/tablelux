'use client';

import { useState, useEffect } from 'react';
import type { QuoteItem, PricingModel, RentalPeriod } from '@/src/types';
import { calculateOrderTotal } from '@/src/lib/pricing';
import { Trash2 } from 'lucide-react';

interface QuoteCalculatorProps {
  items: QuoteItem[];
  pricingModel: PricingModel;
  onQuantityChange?: (sku: string, qty: number) => void;
  onRemove?: (sku: string) => void;
}

export default function QuoteCalculator({
  items,
  pricingModel,
  onQuantityChange,
  onRemove,
}: QuoteCalculatorProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<RentalPeriod>(
    pricingModel.rental_periods[0]
  );
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});

  // Sync local quantities when items change
  useEffect(() => {
    const initial: Record<string, number> = {};
    items.forEach((item) => {
      if (!(item.product.sku in localQuantities)) {
        initial[item.product.sku] = item.quantity;
      }
    });
    if (Object.keys(initial).length > 0) {
      setLocalQuantities((prev) => ({ ...prev, ...initial }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const getQty = (sku: string, fallback: number) => localQuantities[sku] ?? fallback;

  const enrichedItems: QuoteItem[] = items.map((item) => ({
    ...item,
    quantity: getQty(item.product.sku, item.quantity),
    rental_period: selectedPeriod,
  }));

  const totals = calculateOrderTotal(enrichedItems, pricingModel);
  const meetsMinimum = totals.subtotal >= pricingModel.minimum_order_usd;

  const handleQtyChange = (sku: string, value: string) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setLocalQuantities((prev) => ({ ...prev, [sku]: qty }));
    onQuantityChange?.(sku, qty);
  };

  if (items.length === 0) {
    return (
      <div className="border border-dashed border-gray-200 p-10 text-center text-gray-400">
        <p className="text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Your quote is empty
        </p>
        <p className="text-sm">Add items from the catalog above to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-cream border border-gray-200">
      {/* Rental Period Selector */}
      <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap gap-3 items-center">
        <span className="text-navy font-semibold text-sm tracking-wider uppercase mr-2">
          Rental Period:
        </span>
        {pricingModel.rental_periods.map((period) => (
          <button
            key={period.name}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer ${
              selectedPeriod.name === period.name
                ? 'bg-navy text-cream'
                : 'bg-white text-navy border border-navy hover:bg-navy/10'
            }`}
          >
            {period.name} ({period.days}d · {period.price_multiplier}×)
          </button>
        ))}
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-cream">
              <th className="text-left px-6 py-3 font-semibold tracking-wider uppercase text-xs">
                Item
              </th>
              <th className="text-center px-4 py-3 font-semibold tracking-wider uppercase text-xs">
                Unit Price
              </th>
              <th className="text-center px-4 py-3 font-semibold tracking-wider uppercase text-xs">
                Qty
              </th>
              <th className="text-right px-6 py-3 font-semibold tracking-wider uppercase text-xs">
                Line Total
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {enrichedItems.map((item) => {
              const unitPrice =
                item.product.price_per_piece_weekend * selectedPeriod.price_multiplier;
              const lineTotal = unitPrice * item.quantity;
              return (
                <tr key={item.product.sku} className="border-b border-gray-100 hover:bg-white">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-navy" style={{ fontFamily: 'Georgia, serif' }}>
                      {item.product.name}
                    </div>
                    <div className="text-gray-400 text-xs font-mono mt-0.5">
                      {item.product.sku}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-navy font-semibold">
                    ${unitPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="number"
                      min={1}
                      value={getQty(item.product.sku, item.quantity)}
                      onChange={(e) => handleQtyChange(item.product.sku, e.target.value)}
                      className="w-20 border border-gray-300 text-center py-1 px-2 text-navy focus:outline-none focus:border-gold"
                    />
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-navy">
                    ${lineTotal.toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    {onRemove && (
                      <button
                        onClick={() => onRemove(item.product.sku)}
                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="px-6 py-5 border-t border-gray-200 bg-white">
        <div className="max-w-xs ml-auto space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Cleaning Fee ($0.50/piece)</span>
            <span>${totals.cleaning_fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Damage Deposit (25%, refundable)</span>
            <span>${totals.damage_deposit.toFixed(2)}</span>
          </div>
          <div className="h-px bg-gray-200 my-2" />
          <div className="flex justify-between font-bold text-navy text-lg">
            <span>Total</span>
            <span>${totals.total.toFixed(2)}</span>
          </div>

          {/* Minimum order warning */}
          {!meetsMinimum && (
            <p className="text-xs text-amber-600 mt-2">
              Minimum order is ${pricingModel.minimum_order_usd}. Add{' '}
              ${(pricingModel.minimum_order_usd - totals.subtotal).toFixed(2)} more to qualify.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
