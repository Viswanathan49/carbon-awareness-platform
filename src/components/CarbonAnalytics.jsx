import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// ─── EMISSION FACTORS (kg CO₂e) ─────────────────────────────────────────────
const FUEL_FACTORS    = { petrol: 0.21, diesel: 0.17, hybrid: 0.12, ev: 0.05 };
const TRANSIT_FACTOR  = 0.089;   // kg CO₂e per km (bus/train average)
const FLIGHT_SHORT    = 255;     // kg CO₂e per short-haul flight (with RFI)
const FLIGHT_LONG     = 1000;    // kg CO₂e per long-haul flight  (with RFI)
const GRID_FACTORS    = { coal: 0.82, mixed: 0.45, renewable: 0.05 };  // kg/kWh
const DIET_ANNUAL     = { 'meat-heavy': 3285, balanced: 2555, vegetarian: 1700, vegan: 1460 };
const GOODS_FACTOR    = 0.5;     // kg CO₂e per USD equivalent spend

const PARIS_TARGET    = 2000;    // kg/year
const GLOBAL_AVG      = 4500;
const INDIA_AVG       = 1900;
const EU_AVG          = 6800;

const PIE_COLORS = ['#0FDE72', '#00D1FF', '#B026FF', '#FACC15'];

// ─── RECOMMENDATION ENGINE ────────────────────────────────────────────────────
function buildRecs(transport, energy, food, goods) {
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CarbonAnalytics() {
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

  // History & Sharing
  const [history, setHistory]     = useState(() => {
    try { return JSON.parse(localStorage.getItem('cf_history') || '[]'); }
    catch { return []; }
  });
  const [saved, setSaved]         = useState(false);
  const [copied, setCopied]       = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [annualGoal, setAnnualGoal] = useState(() => {
    try { return Number(localStorage.getItem('cf_goal')) || 2500; }
    catch { return 2500; }
  });

  useEffect(() => {
    localStorage.setItem('cf_goal', annualGoal);
  }, [annualGoal]);

  // ─── HELPER COMPONENTS ──────────────────────────────────────────────────
  const RadioCard = ({ label, emoji, value, current, onChange, color }) => {
    const isSelected = value === current;
    return (
      <button
        type="button"
        onClick={() => onChange(value)}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
          isSelected
            ? `bg-[${color}]/10 border-[${color}] text-[${color}]`
            : 'bg-white dark:bg-[#16161a] border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
        style={isSelected ? { borderColor: color, color: color, backgroundColor: `${color}15` } : {}}
      >
        <span className="text-2xl mb-2" aria-hidden="true">{emoji}</span>
        <span className={`text-sm font-bold ${isSelected ? '' : 'text-gray-900 dark:text-white'}`}>{label}</span>
      </button>
    );
  };

  // ─── CALCULATIONS ──────────────────────────────────────────────────────────
  const transport = useMemo(() => {
    const car     = carKm * 52 * FUEL_FACTORS[fuelType];
    const transit = transitKm * 52 * TRANSIT_FACTOR;
    const flights = shortFlights * FLIGHT_SHORT + longFlights * FLIGHT_LONG;
    return Math.round(car + transit + flights);
  }, [carKm, fuelType, transitKm, shortFlights, longFlights]);

  const energy = useMemo(() => Math.round(kwh * 12 * GRID_FACTORS[gridType]), [kwh, gridType]);
  const food   = useMemo(() => DIET_ANNUAL[diet], [diet]);
  const goods  = useMemo(() => Math.round(monthlySpend * 12 * GOODS_FACTOR), [monthlySpend]);
  const total  = transport + energy + food + goods;

  const pieData = [
    { name: 'Transport',   value: transport, color: PIE_COLORS[0] },
    { name: 'Home Energy', value: energy,    color: PIE_COLORS[1] },
    { name: 'Diet',        value: food,      color: PIE_COLORS[2] },
    { name: 'Goods',       value: goods,     color: PIE_COLORS[3] },
  ];

  const comparisonData = [
    { name: 'You', value: total, fill: '#0FDE72' },
    { name: 'India', value: INDIA_AVG, fill: '#a8a29e' },
    { name: 'Paris Target', value: PARIS_TARGET, fill: '#38bdf8' },
    { name: 'Global', value: GLOBAL_AVG, fill: '#f43f5e' },
    { name: 'EU', value: EU_AVG, fill: '#818cf8' },
  ];

  const recs = useMemo(() => buildRecs(transport, energy, food, goods),
    [transport, energy, food, goods]);

  // ─── HISTORY & SHARE ────────────────────────────────────────────────────────
  const saveEntry = () => {
    const entry = {
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      total,
      transport,
      energy,
      food,
      goods,
    };
    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('cf_history', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('cf_history');
  };

  const copyToClipboard = () => {
    const text = `My Annual Carbon Footprint is ${(total/1000).toFixed(2)} t CO₂e.\n\n` + 
                 `🚗 Transport: ${transport} kg\n` +
                 `⚡ Energy: ${energy} kg\n` +
                 `🥩 Diet: ${food} kg\n` +
                 `🛍️ Goods: ${goods} kg\n\n` +
                 `Track yours with CarbonPulse!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ─── SHARED INPUT STYLES ───────────────────────────────────────────────────
  const inputCls = "w-full bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0FDE72] transition-colors";
  const labelCls = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1";

  return (
    <section className="w-full max-w-7xl mx-auto my-12 px-4 relative z-10 clear-both block">

      {/* ── HEADER ── */}
      <div className="bg-white dark:bg-[#16161a] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-8 transition-colors duration-300 relative">
        <div className="h-2 w-full bg-gradient-to-r from-[#0FDE72] via-[#00D1FF] to-[#B026FF]"></div>
        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Carbon Footprint Assessment
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0FDE72]/10 text-[#0FDE72] rounded-full text-xs font-bold border border-[#0FDE72]/20">
              <span>🔬</span> Science-backed factors (IPCC)
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Fill in your actual lifestyle data. Emissions are computed using real-world CO₂e factors — not estimates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ════════════════════════════════════════════════
            LEFT COLUMN — FORM
        ════════════════════════════════════════════════ */}
        <form 
          className="lg:col-span-7 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            setHasCalculated(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >

          {/* ── TRANSPORT ── */}
          <div className="bg-white dark:bg-[#16161a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-[#0FDE72]/5">
              <span className="text-2xl" aria-hidden="true">🚗</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Transport</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="carKm" className={labelCls}>Car distance per week (km)</label>
                <input id="carKm" aria-label="Car distance per week in kilometers" type="number" min="0" max="3000" value={carKm}
                  onChange={e => setCarKm(Number(e.target.value))}
                  className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Car fuel type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
                  <RadioCard label="Petrol" emoji="⛽" value="petrol" current={fuelType} onChange={setFuelType} color="#0FDE72" />
                  <RadioCard label="Diesel" emoji="🛢️" value="diesel" current={fuelType} onChange={setFuelType} color="#0FDE72" />
                  <RadioCard label="Hybrid" emoji="🔋" value="hybrid" current={fuelType} onChange={setFuelType} color="#0FDE72" />
                  <RadioCard label="Electric" emoji="⚡" value="ev" current={fuelType} onChange={setFuelType} color="#0FDE72" />
                </div>
              </div>
              <div>
                <label htmlFor="transitKm" className={labelCls}>Public transit per week (km)</label>
                <input id="transitKm" aria-label="Public transit per week in kilometers" type="number" min="0" max="1000" value={transitKm}
                  onChange={e => setTransitKm(Number(e.target.value))}
                  className={inputCls} />
              </div>
              <div>
                <label htmlFor="shortFlights" className={labelCls}>Short-haul flights per year</label>
                <input id="shortFlights" aria-label="Number of short-haul flights per year" type="number" min="0" max="50" value={shortFlights}
                  onChange={e => setShort(Number(e.target.value))}
                  className={inputCls} />
              </div>
              <div>
                <label htmlFor="longFlights" className={labelCls}>Long-haul flights per year</label>
                <input id="longFlights" aria-label="Number of long-haul flights per year" type="number" min="0" max="20" value={longFlights}
                  onChange={e => setLong(Number(e.target.value))}
                  className={inputCls} />
              </div>
            </div>
          </div>

          {/* ── HOME ENERGY ── */}
          <div className="bg-white dark:bg-[#16161a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-[#00D1FF]/5">
              <span className="text-2xl" aria-hidden="true">⚡</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Home Energy</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="kwh" className={labelCls}>Monthly electricity (kWh)</label>
                <input id="kwh" aria-label="Monthly electricity usage in kilowatt hours" type="number" min="0" max="3000" value={kwh}
                  onChange={e => setKwh(Number(e.target.value))}
                  className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Grid / energy source</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                  <RadioCard label="Coal / Gas Grid" emoji="🏭" value="coal" current={gridType} onChange={setGridType} color="#00D1FF" />
                  <RadioCard label="Mixed Grid" emoji="🔌" value="mixed" current={gridType} onChange={setGridType} color="#00D1FF" />
                  <RadioCard label="100% Green / Solar" emoji="☀️" value="renewable" current={gridType} onChange={setGridType} color="#00D1FF" />
                </div>
              </div>
            </div>
          </div>

          {/* ── LIFESTYLE & DIET ── */}
          <div className="bg-white dark:bg-[#16161a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-[#B026FF]/5">
              <span className="text-2xl" aria-hidden="true">🌱</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Lifestyle & Diet</h3>
            </div>
            <div className="p-6 grid grid-cols-1 gap-6">
              <div>
                <label className={labelCls}>Typical diet profile</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <RadioCard label="Meat-heavy" emoji="🥩" value="meat-heavy" current={diet} onChange={setDiet} color="#B026FF" />
                  <RadioCard label="Balanced" emoji="🍗" value="balanced" current={diet} onChange={setDiet} color="#B026FF" />
                  <RadioCard label="Vegetarian" emoji="🥚" value="vegetarian" current={diet} onChange={setDiet} color="#B026FF" />
                  <RadioCard label="Vegan" emoji="🌱" value="vegan" current={diet} onChange={setDiet} color="#B026FF" />
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <label htmlFor="monthlySpend" className={labelCls}>Monthly non-essential spend (USD equivalent)</label>
                <input id="monthlySpend" aria-label="Monthly non-essential spend in USD equivalent" type="number" min="0" max="5000" value={monthlySpend}
                  onChange={e => setSpend(Number(e.target.value))}
                  className={inputCls} />
                <p className="text-xs text-gray-400 mt-1">Clothing, electronics, dining out, subscriptions.</p>
              </div>
            </div>
          </div>

          {/* ── ACTIONS ── */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 bg-[#0FDE72] hover:bg-[#0bc060] text-black shadow-[0_0_20px_rgba(15,222,114,0.3)] hover:shadow-[0_0_30px_rgba(15,222,114,0.5)] transform hover:-translate-y-1"
            >
              Calculate My Footprint
            </button>
          </div>
        </form>

        {/* ════════════════════════════════════════════════
            RIGHT COLUMN — RESULTS DASHBOARD
        ════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-8">
          
          {!hasCalculated ? (
            <div className="bg-white dark:bg-[#16161a] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px] shadow-sm">
              <div className="text-6xl mb-6 opacity-80 animate-bounce" aria-hidden="true">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Awaiting Data</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Complete your profile on the left and click calculate to generate your customized carbon dashboard and reduction plan.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#111] rounded-full border border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-400">
                <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span> Standing by
              </div>
            </div>
          ) : (
            <div className="animate-fade-in flex flex-col gap-6">
              {/* ── TOTAL SCORE ── */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#111] dark:to-[#0a0a0a] p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl relative overflow-hidden">
                <div className="absolute -top-6 -right-6 text-[120px] opacity-5 select-none" aria-hidden="true">🌍</div>
                <div className="flex justify-between items-center mb-3 relative z-10">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Estimated Footprint</h4>
                  <button onClick={() => setHasCalculated(false)} className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white underline underline-offset-2 transition-colors">
                    Edit inputs
                  </button>
                </div>
                <div className="flex items-end gap-2 mb-1 relative z-10">
                  <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter" aria-label={`Your total footprint is ${(total / 1000).toFixed(2)} tonnes of CO2 equivalent per year`}>
                    {(total / 1000).toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-400 font-medium mb-1">t CO₂e / year</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 relative z-10">
                  That is{' '}
                  <span className="text-red-500 font-bold">{(total / PARIS_TARGET).toFixed(1)}×</span>
                  {' '}the sustainable target (2 t) and{' '}
                  <span className="font-bold text-gray-700 dark:text-gray-200">{(total / GLOBAL_AVG).toFixed(1)}×</span>
                  {' '}the global average.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10">
                  <button onClick={saveEntry} className={`flex-1 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all duration-300 border ${saved ? 'bg-[#0FDE72]/10 text-[#0FDE72] border-[#0FDE72]/30' : 'bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:border-[#0FDE72] hover:text-[#0FDE72]'}`}>
                    {saved ? '✅ Saved' : '💾 Save Entry'}
                  </button>
                  <button onClick={copyToClipboard} className={`flex-1 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all duration-300 border ${copied ? 'bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/30' : 'bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:border-[#00D1FF] hover:text-[#00D1FF]'}`}>
                    {copied ? '✅ Copied' : '📤 Share'}
                  </button>
                </div>
              </div>

          {/* ── BENCHMARK COMPARISON ── */}
          <div className="bg-white dark:bg-[#16161a] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Global Benchmarks</h4>
            <div style={{ width: '100%', height: 160, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={comparisonData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} width={80} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(17, 17, 17, 0.75)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                    formatter={(v) => [`${v.toLocaleString()} kg`, 'Footprint']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── BREAKDOWN BARS ── */}
          <div className="bg-white dark:bg-[#16161a] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Breakdown by category</h4>
            
            {/* ── PIE CHART ── */}
            <div style={{ width: '100%', height: 180, position: 'relative', marginBottom: '10px' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={4}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(17, 17, 17, 0.75)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(v) => [`${v.toLocaleString()} kg`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {pieData.map(item => (
              <div key={item.name}>
                <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  <span>{item.name}</span>
                  <span className="font-mono" style={{ color: item.color }}>{item.value.toLocaleString()} kg</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.min((item.value / total) * 100, 100)}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── RECOMMENDATIONS ── */}
          <div className="bg-white dark:bg-[#16161a] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Personalized Insights</h4>
              <span className="text-xs bg-[#0FDE72]/10 text-[#0FDE72] px-2 py-0.5 rounded-full font-bold border border-[#0FDE72]/20">AI-DRIVEN</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your current footprint is {(total / 1000).toFixed(1)} tonnes. Here are your highest-impact actions.
            </p>
            <h5 className="text-sm font-bold text-gray-900 dark:text-white mt-1">Recommended actions</h5>
            <div className="flex flex-col gap-4 mt-2">
              {recs.map((rec, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-[#16161a] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white z-10" style={{ backgroundColor: rec.color }}>
                    {i + 1}
                  </div>
                  
                  <div className="flex-grow z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg" aria-hidden="true">{rec.icon}</span>
                      <h6 className="text-xs font-bold uppercase tracking-wider" style={{ color: rec.color }}>{rec.category}</h6>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {rec.action}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-[#111]" style={{ color: rec.color, border: `1px solid ${rec.color}30` }}>
                        <span aria-hidden="true">💚</span> Save ~{rec.saving.toLocaleString()} kg CO₂e/year
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-[#111]">
                        <span aria-hidden="true">⏱️</span> {rec.timeframe}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          HISTORY & GOAL TRACKING SECTION
      ════════════════════════════════════════════════ */}
      {hasCalculated && (
        <div className="mt-10 bg-white dark:bg-[#16161a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#111111]/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">📈</span>
            <h3 className="font-bold text-gray-900 dark:text-white">Goal Tracking & Progress</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="annualGoal" className="text-sm font-semibold text-gray-600 dark:text-gray-400">Target (kg):</label>
              <input 
                id="annualGoal"
                type="number"
                value={annualGoal}
                onChange={(e) => setAnnualGoal(Number(e.target.value))}
                className="w-24 bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#0FDE72]"
              />
            </div>
            {history.length > 0 && (
              <button onClick={clearHistory} className="text-xs text-red-400 hover:text-red-500 font-medium transition-colors ml-4 border border-red-400/20 px-2 py-1 rounded">
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {history.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
              <span className="text-4xl mb-3 block opacity-50">🎯</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                No saved entries yet. Calculate and hit "Save this entry" to start tracking your progress towards your goal!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Trendline Chart */}
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Trendline vs Target</h4>
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <LineChart data={[...history].reverse()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8c96a5' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#8c96a5' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(17, 17, 17, 0.75)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                        formatter={(v) => [`${v.toLocaleString()} kg`, 'Recorded Total']}
                      />
                      <ReferenceLine y={annualGoal} stroke="#38bdf8" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Target', fill: '#38bdf8', fontSize: 12 }} />
                      <Line type="monotone" dataKey="total" stroke="#0FDE72" strokeWidth={3} dot={{ fill: '#0FDE72', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* History Table */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Saved Entries</h4>
                <div className="overflow-x-auto max-h-[250px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white dark:bg-[#16161a] z-10">
                      <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                        <th className="text-left py-2 pr-4">Date</th>
                        <th className="text-right py-2 pr-4">Total</th>
                        <th className="text-right py-2 pr-4">Delta vs Goal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((h, i) => {
                        const delta = h.total - annualGoal;
                        const isOver = delta > 0;
                        return (
                          <tr key={i} className="border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                            <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">{h.date}</td>
                            <td className="py-3 pr-4 text-right font-bold text-gray-900 dark:text-white">{(h.total / 1000).toFixed(2)} t</td>
                            <td className={`py-3 pr-4 text-right font-bold ${isOver ? 'text-red-400' : 'text-[#0FDE72]'}`}>
                              {isOver ? '+' : ''}{(delta / 1000).toFixed(2)} t
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      )}

      {/* ════════════════════════════════════════════════
          DATA SOURCES & ABOUT FOOTER
      ════════════════════════════════════════════════ */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
        <div className="glass-card p-6 bg-white dark:bg-[#16161a] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-gray-500 dark:text-gray-400 hover:shadow-md transition-shadow">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Data Sources</h4>
          <ul className="flex flex-col gap-2">
            <li><span className="font-semibold text-gray-700 dark:text-gray-300">UK DEFRA 2023</span> — Transport & Home Energy factors</li>
            <li><span className="font-semibold text-gray-700 dark:text-gray-300">US EPA 2023</span> — Electricity grid emissions</li>
            <li><span className="font-semibold text-gray-700 dark:text-gray-300">ICAO Carbon Calculator</span> — Aviation emissions</li>
            <li><span className="font-semibold text-gray-700 dark:text-gray-300">Our World in Data 2023</span> — Diet emissions & global average</li>
            <li><span className="font-semibold text-gray-700 dark:text-gray-300">IPCC AR6 / SR1.5</span> — Consumption & Paris target</li>
          </ul>
        </div>
        <div className="glass-card p-6 bg-white dark:bg-[#16161a] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-gray-500 dark:text-gray-400 hover:shadow-md transition-shadow">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">About</h4>
          <p className="leading-relaxed mb-4">
            This tool provides estimates for educational purposes based on peer-reviewed emission factors. Individual results may vary based on local grid mix, vehicle efficiency, and personal circumstances.
          </p>
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <p>© {new Date().getFullYear()} Carbon Footprint Awareness Platform — Powered by React & Tailwind</p>
          </div>
        </div>
      </div>

    </section>
  );
}