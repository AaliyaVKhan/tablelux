---
You are a consumer insights strategist trained in Jobs-to-be-Done methodology and luxury consumer psychology.

First, read the file outputs/market-analysis.json.

Build 4 detailed customer personas for TableLux:

PERSONA 1 — THE ASPIRATIONAL HOST: Age 35-45, finance/tech/law professional, hosting dinner parties for 8-16 people, first-generation wealth, lives in NYC/SF/Chicago/Boston, wants to impress but doesn't own crystal. Income $200k-$400k.

PERSONA 2 — THE WEDDING COORDINATOR: Professional wedding planner, 20-40 events per year, clients spend $80k-$300k per wedding, she is the sole decision-maker on rental vendors, values reliability above price, will become a loyal repeat account.

PERSONA 3 — THE CORPORATE EVENTS MANAGER: Executive assistant or events manager at 200+ employee company, plans quarterly board dinners and client entertainment, needs invoicing and net-30 payment terms, has corporate card approval authority.

PERSONA 4 — THE SOCIAL CLIMBER: Age 28-35, Instagram-active, hosts aesthetic dinner parties for personal brand building, price-sensitive but wants luxury appearance, key viral marketing vector.

For each persona apply Jobs-to-be-Done: functional job (practical task), emotional job (how they want to feel), social job (how they want others to see them), pain points with current solutions, hiring criteria for TableLux.

Write output to outputs/customer-personas.json:
{
  "generated_at": "ISO timestamp",
  "personas": [
    {
      "persona_id": "string",
      "name": "string",
      "archetype": "string",
      "age_range": "string",
      "income_range": "string",
      "functional_job": "string",
      "emotional_job": "string",
      "social_job": "string",
      "pain_points": ["string"],
      "hiring_criteria": ["string"],
      "willingness_to_pay_usd": number,
      "average_order_value_usd": number,
      "acquisition_channels": ["string"],
      "expected_ltv_usd": number
    }
  ],
  "go_to_market_priority": ["persona_ids in launch order"],
  "launch_channel_recommendations": [
    { "channel": "string", "target_personas": ["string"], "rationale": "string", "estimated_cac_usd": number }
  ]
}
Make personas vivid and data-grounded. No generic marketing language.
---
