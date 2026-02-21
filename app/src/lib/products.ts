import catalogRaw from '@/src/data/catalog-taxonomy.json';
import type { Category, Product, PricingModel, Tier } from '@/src/types';

// Type the raw JSON structure from the catalog
type RawProduct = {
  sku: string;
  name: string;
  description: string;
  tier: string;
  price_per_piece_weekend: number;
  price_per_piece_week: number;
  available_quantity: number;
  image_description: string;
};

type RawCategory = {
  category_id: string;
  category_name: string;
  description: string;
  products: RawProduct[];
};

type RawCatalog = {
  generated_at: string;
  pricing_model: PricingModel;
  categories: RawCategory[];
};

const catalog = catalogRaw as RawCatalog;

export function getAllCategories(): Category[] {
  return catalog.categories.map((cat) => ({
    category_id: cat.category_id,
    category_name: cat.category_name,
    description: cat.description,
    products: cat.products.map((p) => ({
      ...p,
      tier: p.tier as Tier,
      category_id: cat.category_id,
      category_name: cat.category_name,
    })),
  }));
}

export function getAllProducts(): Product[] {
  return getAllCategories().flatMap((cat) => cat.products);
}

export function getProductsByCategoryId(categoryId: string): Product[] {
  return getAllProducts().filter((p) => p.category_id === categoryId);
}

export function getProductBySku(sku: string): Product | undefined {
  return getAllProducts().find((p) => p.sku === sku);
}

export function getPricingModel(): PricingModel {
  return catalog.pricing_model;
}
