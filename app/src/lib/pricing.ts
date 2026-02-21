import type { QuoteItem, QuoteResponse, PricingModel } from '@/src/types';

/**
 * Calculate the subtotal for a single line item.
 * Applies the rental period multiplier to the weekend base price.
 */
export function calculateItemSubtotal(pricePerPiece: number, quantity: number): number {
  return parseFloat((pricePerPiece * quantity).toFixed(2));
}

/**
 * Calculate the total cleaning fee across all pieces in an order.
 * Cleaning fee is charged per piece regardless of rental period.
 */
export function calculateCleaningFee(totalQuantity: number, feePerPiece: number): number {
  return parseFloat((totalQuantity * feePerPiece).toFixed(2));
}

/**
 * Calculate the refundable damage deposit.
 * Expressed as a percentage of the order subtotal.
 */
export function calculateDamageDeposit(subtotal: number, depositPct: number): number {
  return parseFloat((subtotal * (depositPct / 100)).toFixed(2));
}

/**
 * Calculate the complete order total from a list of quote items.
 * Returns a full QuoteResponse with subtotal, fees, deposit, and grand total.
 * The quote_id is left empty — callers (API routes) should assign a UUID.
 */
export function calculateOrderTotal(
  items: QuoteItem[],
  pricingModel: PricingModel
): QuoteResponse {
  const subtotal = items.reduce((sum, item) => {
    const pricePerPiece =
      item.product.price_per_piece_weekend * item.rental_period.price_multiplier;
    return sum + calculateItemSubtotal(pricePerPiece, item.quantity);
  }, 0);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const cleaningFee = calculateCleaningFee(totalQuantity, pricingModel.cleaning_fee_per_piece);
  const damageDeposit = calculateDamageDeposit(subtotal, pricingModel.damage_deposit_pct);
  const total = parseFloat((subtotal + cleaningFee + damageDeposit).toFixed(2));

  return {
    quote_id: '',
    subtotal: parseFloat(subtotal.toFixed(2)),
    cleaning_fee: cleaningFee,
    damage_deposit: damageDeposit,
    total,
    items,
  };
}
