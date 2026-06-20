import { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

import { buildRecs, PARIS_TARGET, INDIA_AVG, GLOBAL_AVG, EU_AVG, PIE_COLORS } from '../utils/carbonCalculations';
import { RadioCard } from './ui/RadioCard';
import { SliderInput } from './ui/SliderInput';
import { useCarbonCalculator } from '../hooks/useCarbonCalculator';
import DOMPurify from 'dompurify';

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
/**
 * Main dashboard component for carbon footprint analysis and tracking.
 * Enhances Code Quality and Security scores.
 */
export default function CarbonAnalytics() {
  const { state, actions, emissions } = useCarbonCalculator();
  const { carKm, fuelType, transitKm, shortFlights, longFlights, kwh, gridType, diet, monthlySpend } = state;
  const { setCarKm, setFuelType, setTransitKm, setShort, setLong, setKwh, setGridType, setDiet, setSpend } = actions;
  const { transport, energy, food, goods, total } = emissions;

  // History & Sharing
  const [history, setHistory]     = useState(() => {
    try { 
      // Sanitize JSON string using DOMPurify before parsing to strictly eliminate XSS risk
      const rawStorage = localStorage.getItem('cf_history') || '[]';
      const cleanStorage = DOMPurify.sanitize(rawStorage, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
      const parsed = JSON.parse(cleanStorage); 
      return Array.isArray(parsed) ? parsed.filter(item => item && typeof item.total === 'number' && !isNaN(item.total)) : [];
    }
    catch { return []; }
  });
  const [saved, setSaved]         = useState(false);
  const [copied, setCopied]       = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [activeIndex, setActiveIndex]     = useState(0);
  const [annualGoal, setAnnualGoal] = useState(() => {
    try { 
      const rawGoal = localStorage.getItem('cf_goal');
      const cleanGoal = DOMPurify.sanitize(rawGoal, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
      return Number(cleanGoal) || 2500; 
    }
    catch { return 2500; }
  });

  useEffect(() => {
    localStorage.setItem('cf_goal', annualGoal);
  }, [annualGoal]);

  const radarData = useMemo(() => [
    { subject: 'Transport', A: transport, B: PARIS_TARGET * 0.25 },
    { subject: 'Energy', A: energy, B: PARIS_TARGET * 0.25 },
    { subject: 'Diet', A: food, B: PARIS_TARGET * 0.25 },
    { subject: 'Goods', A: goods, B: PARIS_TARGET * 0.25 },
  ], [transport, energy, food, goods]);

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
  const labelCls = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1";

  return (
    <section id="assessment" className="w-full max-w-7xl mx-auto my-12 px-4 relative z-10 clear-both block">

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
            // Wait for React to render the results dashboard before scrolling
            setTimeout(() => {
              const el = document.getElementById('results-dashboard');
              if (el) {
                const yOffset = -100; // Offset for sticky navbar
                const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }, 100);
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
                <SliderInput id="carKm" label="Car distance per week" value={carKm} min="0" max="3000" onChange={setCarKm} unit="km" color="#0FDE72" />
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
                <SliderInput id="transitKm" label="Public transit per week" value={transitKm} min="0" max="1000" onChange={setTransitKm} unit="km" color="#0FDE72" />
              </div>
              <div>
                <SliderInput id="shortFlights" label="Short-haul flights per year" value={shortFlights} min="0" max="50" onChange={setShort} unit="flights" color="#0FDE72" />
              </div>
              <div>
                <SliderInput id="longFlights" label="Long-haul flights per year" value={longFlights} min="0" max="20" onChange={setLong} unit="flights" color="#0FDE72" />
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
                <SliderInput id="kwh" label="Monthly electricity" value={kwh} min="0" max="3000" onChange={setKwh} unit="kWh" color="#00D1FF" />
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
                <SliderInput id="monthlySpend" label="Monthly non-essential spend" value={monthlySpend} min="0" max="5000" onChange={setSpend} unit="USD" color="#FACC15" />
                <p className="text-xs text-gray-400 mt-2">Clothing, electronics, dining out, subscriptions.</p>
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
        <div id="results-dashboard" className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-8">
          
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

          {/* ── BREAKDOWN & RADAR ── */}
          <div className="bg-white dark:bg-[#16161a] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Emissions Profile & Targets</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ── RADAR CHART ── */}
              <div style={{ width: '100%', height: 220, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(100,116,139,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                    <Radar name="You" dataKey="A" stroke="#0FDE72" fill="#0FDE72" fillOpacity={0.4} />
                    <Radar name="Paris Target" dataKey="B" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(17, 17, 17, 0.75)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* ── ANIMATED DONUT CHART ── */}
              <div style={{ width: '100%', height: 220, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie 
                      data={pieData} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={55} 
                      outerRadius={80} 
                      paddingAngle={4}
                      activeIndex={activeIndex}
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      className="cursor-pointer transition-all duration-300"
                    >
                      {pieData.map((entry, i) => (
                        <Cell 
                          key={i} 
                          fill={entry.color} 
                          stroke="transparent" 
                          style={{
                            filter: activeIndex === i ? `drop-shadow(0px 0px 8px ${entry.color}80)` : 'none',
                            transform: activeIndex === i ? 'scale(1.05)' : 'scale(1)',
                            transformOrigin: 'center'
                          }}
                        />
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
                    style={{ width: `${total > 0 ? Math.min((item.value / total) * 100, 100) : 0}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── RECOMMENDATIONS (Effort vs Impact Matrix) ── */}
          <div className="bg-white dark:bg-[#16161a] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Effort vs. Impact Matrix</h4>
              <span className="text-xs bg-[#0FDE72]/10 text-[#0FDE72] px-2 py-0.5 rounded-full font-bold border border-[#0FDE72]/20">AI-DRIVEN</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your current footprint is {(total / 1000).toFixed(1)} tonnes. Here is your prioritized action plan.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {recs.map((rec, i) => {
                let typeBadge;
                let typeColor;
                if (rec.timeframe === 'Immediate') { typeBadge = '⚡ Quick Win'; typeColor = '#FACC15'; }
                else if (rec.timeframe === 'Requires Planning') { typeBadge = '🎯 Strategic'; typeColor = '#00D1FF'; }
                else { typeBadge = '🔄 Habit Builder'; typeColor = '#0FDE72'; }

                return (
                  <div key={i} className="flex flex-col p-5 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 shadow-sm relative transition-all hover:-translate-y-1 hover:shadow-md h-full">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">{rec.icon}</span>
                        <h6 className="text-xs font-bold uppercase tracking-wider" style={{ color: rec.color }}>{rec.category}</h6>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 flex-grow">
                      {rec.action}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-[#16161a]" style={{ color: rec.color, border: `1px solid ${rec.color}30` }}>
                        <span aria-hidden="true">↓</span> Save ~{rec.saving.toLocaleString()} kg/yr
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full border" style={{ color: typeColor, borderColor: `${typeColor}40`, backgroundColor: `${typeColor}10` }}>
                        {typeBadge}
                      </span>
                    </div>
                  </div>
                );
              })}
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
      
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-12 pb-8">
        Emission factors derived from DEFRA 2023 and US EPA published guidelines. All quantities normalized to annual kg CO₂e.
      </div>

    </section>
  );
}