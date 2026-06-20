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
    <section className="w-full max-w-7xl mx-auto my-12 px-4 relative z-10 clear-both block">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: GOOGLE FORM STYLE INTAKE */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-[#16161a] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300">
            <div className="h-3 w-full bg-gradient-to-r from-[#0FDE72] to-[#00D1FF]"></div>
            <div className="p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Carbon Footprint Assessment</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Adjust your lifestyle metrics below. Our zero-latency engine will instantly generate your personalized emissions profile and reduction strategy.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#16161a] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col gap-6 transition-all hover:shadow-md">
            <div>
              <label className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-1">
                <span className="flex items-center justify-center w-10 h-10 bg-[#0FDE72]/10 text-[#0FDE72] rounded-xl text-xl">🚗</span>
                Transport & Travel
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 ml-13">Estimate your monthly emissions from driving, flights, and public transit.</p>
            </div>
            <div className="flex items-center gap-4">
              <input type="range" min="50" max="1000" value={transport} onChange={(e) => setTransport(Number(e.target.value))} className="flex-grow h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800 accent-[#0FDE72]" />
              <span className="font-mono font-bold text-[#0FDE72] bg-[#0FDE72]/10 px-4 py-2 rounded-lg min-w-[100px] text-center border border-[#0FDE72]/20">{transport} kg</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#16161a] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col gap-6 transition-all hover:shadow-md">
            <div>
              <label className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-1">
                <span className="flex items-center justify-center w-10 h-10 bg-[#00D1FF]/10 text-[#00D1FF] rounded-xl text-xl">⚡</span>
                Home Energy Usage
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 ml-13">Electricity, heating, and cooling usage for your residence.</p>
            </div>
            <div className="flex items-center gap-4">
              <input type="range" min="50" max="1000" value={energy} onChange={(e) => setEnergy(Number(e.target.value))} className="flex-grow h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800 accent-[#00D1FF]" />
              <span className="font-mono font-bold text-[#00D1FF] bg-[#00D1FF]/10 px-4 py-2 rounded-lg min-w-[100px] text-center border border-[#00D1FF]/20">{energy} kg</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#16161a] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col gap-6 transition-all hover:shadow-md">
            <div>
              <label className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-1">
                <span className="flex items-center justify-center w-10 h-10 bg-[#B026FF]/10 text-[#B026FF] rounded-xl text-xl">🥩</span>
                Diet & Food
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 ml-13">Meat consumption, imported foods, and dining out frequency.</p>
            </div>
            <div className="flex items-center gap-4">
              <input type="range" min="50" max="1000" value={food} onChange={(e) => setFood(Number(e.target.value))} className="flex-grow h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800 accent-[#B026FF]" />
              <span className="font-mono font-bold text-[#B026FF] bg-[#B026FF]/10 px-4 py-2 rounded-lg min-w-[100px] text-center border border-[#B026FF]/20">{food} kg</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#16161a] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col gap-6 transition-all hover:shadow-md">
            <div>
              <label className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-1">
                <span className="flex items-center justify-center w-10 h-10 bg-[#FACC15]/10 text-[#FACC15] rounded-xl text-xl">🛍️</span>
                Goods & Services
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 ml-13">Clothing, electronics, subscriptions, and general shopping habits.</p>
            </div>
            <div className="flex items-center gap-4">
              <input type="range" min="50" max="1000" value={goods} onChange={(e) => setGoods(Number(e.target.value))} className="flex-grow h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800 accent-[#FACC15]" />
              <span className="font-mono font-bold text-[#FACC15] bg-[#FACC15]/10 px-4 py-2 rounded-lg min-w-[100px] text-center border border-[#FACC15]/20">{goods} kg</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: STICKY DASHBOARD */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-8">
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black/60 dark:to-black/40 p-8 rounded-3xl border border-gray-200 dark:border-white/5 flex flex-col justify-center items-center shadow-xl relative overflow-hidden transition-colors duration-300">
             <div className="absolute -top-4 -right-4 p-4 opacity-5 text-9xl">🌍</div>
             <h4 className="text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase text-xs mb-3">Your Annual Footprint</h4>
             <span className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter drop-shadow-md">
               {totalFootprint} <span className="text-2xl text-gray-400 font-medium tracking-normal">t CO₂e</span>
             </span>
             <div className="mt-6 flex items-center gap-2 bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0FDE72] animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Live Sync Active</span>
             </div>
          </div>

          <div className="bg-[#0FDE72]/5 dark:bg-[#0FDE72]/10 p-6 rounded-3xl border border-[#0FDE72]/20 shadow-lg flex flex-col transition-all duration-500">
            <h4 className="text-[#0FDE72] font-bold tracking-wide text-sm mb-3 flex items-center gap-2 uppercase">
              <span className="text-lg">💡</span> AI Insight Engine
            </h4>
            <div className="bg-white dark:bg-[#16161a] p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <h5 className="font-bold text-gray-900 dark:text-white mb-2">{activeSuggestion.title}</h5>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {activeSuggestion.text}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#16161a] p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-white/5 flex flex-col">
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-4">Emissions Breakdown</h4>
             <div className="w-full h-[220px] relative flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={5}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }} 
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }} 
                    />
                  </PieChart>
               </ResponsiveContainer>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
}