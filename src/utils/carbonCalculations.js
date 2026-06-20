/**
 * Emission factors derived from DEFRA 2023 and US EPA published guidelines.
 * All quantities normalized to annual kg CO₂e.
 */

export const FUEL_FACTORS = {
  petrol: 0.21,
  diesel: 0.17,
  hybrid: 0.12,
  ev: 0.05,
};

export const GRID_FACTORS = {
  mixed: 0.23,
  renewable: 0.0,
  coal: 0.82,
};

export const TRANSIT_FACTOR = 0.04;
export const FLIGHT_SHORT = 150;
export const FLIGHT_LONG = 800;
export const GOODS_FACTOR = 0.3;

export const DIET_ANNUAL = {
  'meat-heavy': 3285,
  balanced: 2555,
  vegetarian: 1700,
  vegan: 1460,
};

export const PARIS_TARGET = 2100;
export const INDIA_AVG = 1900;
export const GLOBAL_AVG = 4700;
export const EU_AVG = 6800;
export const PIE_COLORS = ['#38bdf8', '#fbbf24', '#f43f5e', '#a78bfa'];

/**
 * Calculates the total emissions based on user inputs.
 */
export function calculateEmissions({ carKm, fuelType, transitKm, shortFlights, longFlights, kwh, gridType, diet, monthlySpend }) {
  const transport = Math.round(
    carKm * 52 * FUEL_FACTORS[fuelType] +
    transitKm * 52 * TRANSIT_FACTOR +
    shortFlights * FLIGHT_SHORT +
    longFlights * FLIGHT_LONG
  );

  const energy = Math.round(kwh * 12 * GRID_FACTORS[gridType]);
  const food = DIET_ANNUAL[diet];
  const goods = Math.round(monthlySpend * 12 * GOODS_FACTOR);

  return { transport, energy, food, goods, total: transport + energy + food + goods };
}

/**
 * Builds actionable recommendations based on emission categories.
 */
export function buildRecs(transport, energy, food, goods) {
  const pool = [
    {
      category: 'Transport', color: '#0FDE72', icon: '🚗', timeframe: 'Ongoing',
      action: 'Opt for public transport or cycling for 2 regular journeys per week.',
      saving: Math.round(transport * 0.12)
    },
    {
      category: 'Transport', color: '#0FDE72', icon: '🚗', timeframe: 'Achievable within 30 days',
      action: 'Combine car errands and reduce non-essential trips by 10% annually.',
      saving: Math.round(transport * 0.10)
    },
    {
      category: 'Transport', color: '#0FDE72', icon: '🚗', timeframe: 'Immediate',
      action: 'Work from home 2 days/week to eliminate commute emissions.',
      saving: Math.round(transport * 0.25)
    },
    {
      category: 'Home Energy', color: '#00D1FF', icon: '⚡', timeframe: 'Requires Planning',
      action: 'Switch to a certified green energy provider or install solar panels.',
      saving: Math.round(energy * 0.60)
    },
    {
      category: 'Home Energy', color: '#00D1FF', icon: '⚡', timeframe: 'Achievable within 30 days',
      action: 'Install LED lighting and a smart thermostat to cut idle consumption.',
      saving: Math.round(energy * 0.15)
    },
    {
      category: 'Diet', color: '#B026FF', icon: '🥩', timeframe: 'Ongoing',
      action: 'Introduce one meat-free day per week, focusing on plant-based meals.',
      saving: Math.round(food * 0.14)
    },
    {
      category: 'Diet', color: '#B026FF', icon: '🥩', timeframe: 'Immediate',
      action: 'Reduce food waste by meal-planning — 30% of food emissions come from waste.',
      saving: Math.round(food * 0.09)
    },
    {
      category: 'Shopping & Goods', color: '#FACC15', icon: '🛍️', timeframe: 'Ongoing',
      action: 'Prioritize buying second-hand items or repairing existing ones for 10% of purchases.',
      saving: Math.round(goods * 0.20)
    },
  ];
  return pool.sort((a, b) => b.saving - a.saving).slice(0, 4);
}
