import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  Transport: '#0FDE72',
  Energy: '#00D1FF',
  Food: '#B026FF',
  Goods: '#FACC15'
};

const SUGGESTIONS = {
  Transport: {
    title: "Optimize Commute & Travel",
    text: "Your transport footprint is your highest contributor. Consider carpooling, switching to public transit, or exploring EVs. A 2-day work-from-home schedule can reduce this segment by 40%."
  },
  Energy: {
    title: "Audit Home Energy",
    text: "Home energy dominates your emissions. Switch to LED lighting, optimize your HVAC with a smart thermostat, and unplug idle devices. Transitioning to a green energy provider has the highest impact."
  },
  Food: {
    title: "Shift Dietary Habits",
    text: "Your dietary choices are your primary emission source. Shifting just two meals a week to plant-based alternatives can drop this segment by 15%. Prioritize local, seasonal produce."
  },
  Goods: {
    title: "Adopt Circular Economy",
    text: "Your consumption of goods is driving your footprint. Adopt a circular economy mindset: buy refurbished electronics, reduce fast fashion, and prioritize durable, sustainable goods."
  }
};

export default function CarbonAnalytics() {
  const [transport, setTransport] = useState(450);
  const [energy, setEnergy] = useState(300);
  const [food, setFood] = useState(250);
  const [goods, setGoods] = useState(150);

  const totalFootprint = useMemo(() => ((transport + energy + food + goods) / 1000).toFixed(2), [transport, energy, food, goods]);

  const chartData = useMemo(() => [
    { name: 'Transport', value: transport, color: COLORS.Transport },
    { name: 'Energy', value: energy, color: COLORS.Energy },
    { name: 'Food', value: food, color: COLORS.Food },
    { name: 'Goods', value: goods, color: COLORS.Goods }
  ], [transport, energy, food, goods]);

  const highestCategory = useMemo(() => {
    return chartData.reduce((max, current) => (current.value > max.value ? current : max), chartData[0]).name;
  }, [chartData]);

  const activeSuggestion = SUGGESTIONS[highestCategory];

  const trendData = useMemo(() => {
    const base = parseFloat(totalFootprint);
    return [
      { month: 'Now', emissions: base },
      { month: '+1 Mo', emissions: +(base * 0.95).toFixed(2) },
      { month: '+3 Mo', emissions: +(base * 0.85).toFixed(2) },
      { month: '+6 Mo', emissions: +(base * 0.70).toFixed(2) },
    ]
  }, [totalFootprint]);

  return (
    <section className="w-full max-w-7xl mx-auto my-16 px-4 relative z-10 clear-both block">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Live Footprint <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0FDE72] to-[#00D1FF]">Analyzer</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
          Adjust your lifestyle metrics below to generate instant, zero-latency insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6 bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">
            Data Intake Parameters
          </h3>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span>Transport & Travel</span>
                <span className="text-[#0FDE72]">{transport} kg/mo</span>
              </label>
              <input type="range" min="50" max="1000" value={transport} onChange={(e) => setTransport(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800 accent-[#0FDE72]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span>Home Energy Usage</span>
                <span className="text-[#00D1FF]">{energy} kg/mo</span>
              </label>
              <input type="range" min="50" max="1000" value={energy} onChange={(e) => setEnergy(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800 accent-[#00D1FF]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span>Diet & Food</span>
                <span className="text-[#B026FF]">{food} kg/mo</span>
              </label>
              <input type="range" min="50" max="1000" value={food} onChange={(e) => setFood(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800 accent-[#B026FF]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span>Goods & Services</span>
                <span className="text-[#FACC15]">{goods} kg/mo</span>
              </label>
              <input type="range" min="50" max="1000" value={goods} onChange={(e) => setGoods(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800 accent-[#FACC15]" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Charts & Outputs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black/60 dark:to-black/40 p-6 rounded-3xl border border-gray-200 dark:border-white/5 flex flex-col justify-center items-center shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🌍</div>
               <h4 className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-xs mb-2">Estimated Footprint</h4>
               <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                 {totalFootprint} <span className="text-2xl text-gray-400 font-medium">t CO₂e</span>
               </span>
               <p className="text-sm mt-3 text-gray-500">per year (annualized)</p>
            </div>

            <div className="bg-[#0FDE72]/10 p-6 rounded-3xl border border-[#0FDE72]/20 shadow-lg flex flex-col justify-center transition-all duration-500">
              <h4 className="text-[#0FDE72] font-bold tracking-wide text-sm mb-2 flex items-center gap-2">
                <span>💡</span> {activeSuggestion.title}
              </h4>
              <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed font-medium">
                {activeSuggestion.text}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
            <div className="bg-white dark:bg-[#111111] p-5 rounded-3xl shadow-lg border border-gray-200 dark:border-white/10 flex flex-col min-h-[250px]">
               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-2">Footprint Distribution</h4>
               <div className="flex-grow w-full relative">
                 <ResponsiveContainer width="100%" height="100%" minHeight={180}>
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={4}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                    </PieChart>
                 </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-white dark:bg-[#111111] p-5 rounded-3xl shadow-lg border border-gray-200 dark:border-white/10 flex flex-col min-h-[250px]">
               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-2">Projected Reduction</h4>
               <div className="flex-grow w-full relative">
                 <ResponsiveContainer width="100%" height="100%" minHeight={180}>
                    <LineChart data={trendData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                      <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                      <Line type="monotone" dataKey="emissions" stroke="#0FDE72" strokeWidth={3} dot={{ fill: '#111', stroke: '#0FDE72', strokeWidth: 2, r: 4 }} />
                    </LineChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
