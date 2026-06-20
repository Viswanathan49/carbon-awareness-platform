/**
 * Emission factors derived from DEFRA 2023 and US EPA published guidelines.
 * All quantities normalized to annual kg CO₂e.
 */

export const FUEL_FACTORS = {
  petrol: 0.21,
  diesel: 0.17,
  electric: 0.05,
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
  const recs = [];
  
  if (transport > 1000) {
    recs.push({
      id: 1, title: 'Carpool or Public Transit',
      desc: 'Replacing 2 days of driving with transit saves ~400kg CO₂e/yr.',
      effort: 'Medium', impact: 'High', type: 'Transport'
    });
  }
  if (energy > 1500) {
    recs.push({
      id: 2, title: 'LED & Smart Thermostat',
      desc: 'Upgrading your home lighting and AC control saves ~300kg CO₂e/yr.',
      effort: 'Low', impact: 'Medium', type: 'Energy'
    });
  }
  if (food >= 1500) {
    recs.push({
      id: 3, title: 'Meatless Mondays',
      desc: 'Swapping meat for plant-based meals 1-2 days/week saves ~250kg CO₂e/yr.',
      effort: 'Low', impact: 'High', type: 'Diet'
    });
  }
  if (goods > 800) {
    recs.push({
      id: 4, title: 'Second-hand First',
      desc: 'Buying refurbished electronics/clothes saves ~150kg CO₂e/yr.',
      effort: 'Medium', impact: 'Low', type: 'Goods'
    });
  }
  
  // Fallback
  if (recs.length === 0) {
    recs.push({
      id: 5, title: 'Offset Remaining Emissions',
      desc: 'Look into verified Gold Standard carbon offsets for the rest.',
      effort: 'Low', impact: 'Medium', type: 'General'
    });
  }
  
  return recs;
}
