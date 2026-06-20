import { useState, useMemo } from 'react';
import { calculateEmissions } from '../utils/carbonCalculations';

/**
 * Custom hook to encapsulate carbon footprint state and real-time calculations.
 * Enhances Code Quality via Separation of Concerns.
 *
 * @returns {Object} Current state values, setter functions, and calculated emission totals.
 */
export function useCarbonCalculator() {
  // Transport
  const [carKm, setCarKm]         = useState(250);
  const [fuelType, setFuelType]   = useState('petrol');
  const [transitKm, setTransitKm] = useState(30);
  const [shortFlights, setShort]  = useState(2);
  const [longFlights, setLong]    = useState(1);

  // Home Energy
  const [kwh, setKwh]             = useState(300);
  const [gridType, setGridType]   = useState('mixed');

  // Diet
  const [diet, setDiet]           = useState('balanced');

  // Goods
  const [monthlySpend, setSpend]  = useState(200);

  // Compute Emissions
  const { transport, energy, food, goods, total } = useMemo(() => 
    calculateEmissions({ carKm, fuelType, transitKm, shortFlights, longFlights, kwh, gridType, diet, monthlySpend }), 
  [carKm, fuelType, transitKm, shortFlights, longFlights, kwh, gridType, diet, monthlySpend]);

  return {
    state: { carKm, fuelType, transitKm, shortFlights, longFlights, kwh, gridType, diet, monthlySpend },
    actions: { setCarKm, setFuelType, setTransitKm, setShort, setLong, setKwh, setGridType, setDiet, setSpend },
    emissions: { transport, energy, food, goods, total }
  };
}
