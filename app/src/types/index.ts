export type Tier = 'STD' | 'PRE' | 'LUX';

export type RentalPeriod = {
  name: string;
  days: number;
  price_multiplier: number;
};

export type Product = {
  sku: string;
  name: string;
  description: string;
  tier: Tier;
  price_per_piece_weekend: number;
  price_per_piece_week: number;
  available_quantity: number;
  image_description: string;
  category_id: string;
  category_name: string;
};

export type Category = {
  category_id: string;
  category_name: string;
  description: string;
  products: Product[];
};

export type PricingModel = {
  minimum_order_usd: number;
  damage_deposit_pct: number;
  cleaning_fee_per_piece: number;
  rental_periods: RentalPeriod[];
};

export type QuoteItem = {
  product: Product;
  quantity: number;
  rental_period: RentalPeriod;
};

export type QuoteRequest = {
  items: QuoteItem[];
  event_date: string;
  event_type: string;
  name: string;
  email: string;
  notes: string;
};

export type QuoteResponse = {
  quote_id: string;
  subtotal: number;
  cleaning_fee: number;
  damage_deposit: number;
  total: number;
  items: QuoteItem[];
};
