import { describe, it, expect } from 'vitest';
import { calculateEmissions, buildRecs } from './carbonCalculations';

describe('carbonCalculations utility', () => {
  it('calculates total emissions correctly for a standard user profile', () => {
    const inputs = {
      carKm: 100,
      fuelType: 'petrol',
      transitKm: 20,
      shortFlights: 1,
      longFlights: 0,
      kwh: 200,
      gridType: 'mixed',
      diet: 'balanced',
      monthlySpend: 100
    };

    const result = calculateEmissions(inputs);
    
    // car: 100 * 52 * 0.21 = 1092
    // transit: 20 * 52 * 0.04 = 41.6
    // flights: 150
    // transport = Math.round(1092 + 41.6 + 150) = 1284
    expect(result.transport).toBe(1284);

    // energy: 200 * 12 * 0.23 = 552
    expect(result.energy).toBe(552);

    // food: balanced = 2555
    expect(result.food).toBe(2555);

    // goods: 100 * 12 * 0.3 = 360
    expect(result.goods).toBe(360);

    expect(result.total).toBe(1284 + 552 + 2555 + 360);
  });

  it('calculates properly for a zero-emission lifestyle', () => {
    const inputs = {
      carKm: 0,
      fuelType: 'ev', transitKm: 0, shortFlights: 0, longFlights: 0,
      kwh: 0, gridType: 'renewable', diet: 'vegan', monthlySpend: 0
    };
    const result = calculateEmissions(inputs);
    expect(result.transport).toBe(0);
    expect(result.energy).toBe(0);
    expect(result.food).toBe(1460); // base vegan diet emissions
    expect(result.goods).toBe(0);
    expect(result.total).toBe(1460);
  });

  it('generates targeted recommendations for high emitters', () => {
    const recs = buildRecs(2000, 2000, 2000, 2000);
    expect(recs.length).toBe(4);
    expect(recs[0].category).toBeDefined();
    expect(recs[0].saving).toBeGreaterThan(0);
  });
});
