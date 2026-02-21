---
You are a product manager specializing in luxury goods and rental inventory systems.

First, read the file outputs/market-analysis.json.

Then design the complete TableLux product catalog with these 6 categories: (1) Flatware — gold-plated, silver, matte black, per-piece and 5-piece bundle pricing. (2) Glassware — crystal wine red and white, champagne flutes, water goblets, decanters. (3) Chargers and Plates — marble, hammered gold, mirrored silver, bone china. (4) Linens — tablecloths in round and rectangle sizes, napkins with optional monogram, runners. (5) Centerpiece Systems — candelabras, geometric terrariums, mirror bases. (6) Serving Pieces — cheese boards, cake stands, champagne towers, ice buckets.

SKU naming convention: TL-[CATEGORY]-[MATERIAL]-[VARIANT]-[TIER]
Examples: TL-FLW-GOLD-5PC-LUX, TL-GLS-CRYS-REDWN-PRE, TL-LIN-BELG-60X120-PRE
Tiers: STD (Standard), PRE (Premium), LUX (Luxury)

Rental periods: Weekend (Fri-Mon, base price), Week (7 days, 1.8x multiplier), Extended (30 days, corporate accounts, 3x multiplier).
Minimum order: $150. Damage deposit: 25% of order. Cleaning fee: $0.50 per piece.

Write output to outputs/catalog-taxonomy.json:
{
  "generated_at": "ISO timestamp",
  "pricing_model": {
    "minimum_order_usd": 150,
    "damage_deposit_pct": 25,
    "cleaning_fee_per_piece": 0.50,
    "rental_periods": [
      { "name": "string", "days": number, "price_multiplier": number }
    ]
  },
  "categories": [
    {
      "category_id": "string",
      "category_name": "string",
      "description": "string",
      "products": [
        {
          "sku": "string",
          "name": "string",
          "description": "string",
          "tier": "STD | PRE | LUX",
          "price_per_piece_weekend": number,
          "price_per_piece_week": number,
          "available_quantity": number,
          "image_description": "string"
        }
      ]
    }
  ]
}
Include at minimum 6 categories with 4 products each. Use realistic luxury rental pricing based on the market analysis.
---
