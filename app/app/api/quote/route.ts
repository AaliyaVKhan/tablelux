import { NextRequest, NextResponse } from 'next/server';
import { getPricingModel } from '@/src/lib/products';
import { calculateOrderTotal } from '@/src/lib/pricing';
import type { QuoteRequest, QuoteResponse } from '@/src/types';

export async function POST(req: NextRequest) {
  let body: QuoteRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { items, name, email } = body;

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }
  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'At least one item is required.' }, { status: 400 });
  }

  const pricingModel = getPricingModel();
  const totals = calculateOrderTotal(items, pricingModel);

  const response: QuoteResponse = {
    quote_id: crypto.randomUUID(),
    subtotal: totals.subtotal,
    cleaning_fee: totals.cleaning_fee,
    damage_deposit: totals.damage_deposit,
    total: totals.total,
    items,
  };

  return NextResponse.json(response, { status: 201 });
}
