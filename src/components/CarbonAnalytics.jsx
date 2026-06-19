import React, { useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Transport', value: 45, color: '#0FDE72' },
  { name: 'Home Energy', value: 30, color: '#00D1FF' },
  { name: 'Food', value: 15, color: '#B026FF' },
  { name: 'Goods', value: 10, color: '#FACC15' }
];

const historyData = [
  { month: 'Jan', emissions: 5.2 },
  { month: 'Feb', emissions: 4.8 },
  { month: 'Mar', emissions: 4.5 }
];

const baselines = {
  Global: 4.5,
  US: 14.4,
  EU: 6.8,
  India: 1.9,
  ParisTarget: 2.0
};

export default function CarbonAnalytics({ userTotal = 4.5 }) {
  const [region, setRegion] = useState('Global');
  const calculatePercentage = (user, baseline) => Math.min((user / baseline) * 100, 100).toFixed(0);

  return (
    <section className="w-full max-w-5xl mx-auto my-16 px-4 relative z-10">
      {/* THE MAIN CARD ENCLOSURE */}
      <div className="bg-white dark:bg-[#111111] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-6 md:p-10 flex flex-col gap-8">
        
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Carbon Telemetry</h2>
        
        {/* COMPARATIVE ANALYSIS PANEL */}
        <div className="p-6 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-gray-900 dark:text-white text-sm font-bold tracking-widest uppercase">Comparative Analysis</h3>
            <select 
              value={region} 
              onChange={(e) => setRegion(e.target.value)}
              className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-[#0FDE72] border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FDE72] font-medium transition-colors"
            >
              <option value="Global">Global Average</option>
              <option value="US">United States</option>
              <option value="EU">European Union</option>
              <option value="India">India</option>
            </select>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                <span>Vs {region} Baseline ({baselines[region]}t)</span>
                <span className="text-[#0FDE72] font-mono font-bold text-lg">{calculatePercentage(userTotal, baselines[region])}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-[#0FDE72] h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${calculatePercentage(userTotal, baselines[region])}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                <span>Vs Paris 1.5°C Target (2.0t)</span>
                <span className="text-[#B026FF] font-mono font-bold text-lg">{calculatePercentage(userTotal, baselines.ParisTarget)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-[#B026FF] h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${calculatePercentage(userTotal, baselines.ParisTarget)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* CHARTS PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80 w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col">
            <h3 className="text-[#0FDE72] text-xs font-bold tracking-widest mb-4 uppercase">Emission Source Breakdown</h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={90} paddingAngle={5}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', color: '#000', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="h-80 w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col">
            <h3 className="text-[#00D1FF] text-xs font-bold tracking-widest mb-4 uppercase">Historical Trend Matrix</h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', color: '#000', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Line type="monotone" dataKey="emissions" stroke="#00D1FF" strokeWidth={3} dot={{ fill: '#fff', stroke: '#00D1FF', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
