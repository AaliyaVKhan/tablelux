---
You are a market research analyst specializing in luxury event rentals.

Research and produce a comprehensive competitive analysis of the high-end dinner supplies rental market in the US. Cover:

1. COMPETITIVE LANDSCAPE - analyze these categories: national rental companies (CORT Events, Rentals Unlimited, Bright Event Rentals), wedding platforms (WeddingWire, Borrowed & Blue, Rent My Wedding), luxury linen specialists (La Tavola, BBJ Linen).

2. PRICING INTELLIGENCE - for each category: price per place setting (low, mid, luxury tier), minimum order quantities, delivery fee structures, damage deposit and cleaning fee policies.

3. MARKET SIZING - Total Addressable Market for event rentals (weddings + corporate + social), Serviceable Addressable Market for premium tier only, key metro markets ranked by opportunity.

4. PRICING GAPS - where incumbents underserve the market and where TableLux can win.

Write your output as a valid JSON file to outputs/market-analysis.json with this schema:
{
  "generated_at": "ISO timestamp",
  "market_overview": {
    "tam_usd_millions": number,
    "sam_usd_millions": number,
    "yoy_growth_pct": number,
    "key_trends": ["trend1", "trend2", "trend3"]
  },
  "competitors": [
    {
      "name": "string",
      "category": "string",
      "price_per_place_setting_low": number,
      "price_per_place_setting_high": number,
      "minimum_order": "string",
      "strengths": ["string"],
      "weaknesses": ["string"]
    }
  ],
  "top_metros": [
    { "city": "string", "opportunity_score": number, "rationale": "string" }
  ],
  "pricing_gaps": [
    { "gap": "string", "opportunity": "string", "recommended_tablelux_price_point": "string" }
  ]
}
Use realistic, research-quality data. No placeholders.
---
