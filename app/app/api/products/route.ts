import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/src/lib/products';
import type { Tier } from '@/src/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categories = searchParams.getAll('category');
  const tiers = searchParams.getAll('tier') as Tier[];

  let products = getAllProducts();

  if (categories.length > 0) {
    products = products.filter((p) => categories.includes(p.category_id));
  }
  if (tiers.length > 0) {
    products = products.filter((p) => tiers.includes(p.tier));
  }

  return NextResponse.json({ products, total: products.length });
}
