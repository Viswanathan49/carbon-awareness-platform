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
    {/* ENFORCED BLOCK LAYOUT: Removed negative margins, added massive clearing space (mt-24), isolated z-index */}
    <div className="relative block w-full clear-both mt-24 mb-16 px-4 z-0">
      <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto p-8 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl">
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Carbon Telemetry</h2>
        
        {/* LOCALIZATION MATRIX */}
        <div className="p-6 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-900 dark:text-white text-sm font-bold tracking-widest uppercase">Comparative Analysis</h3>
            <select 
              value={region} 
              onChange={(e) => setRegion(e.target.value)}
              className="bg-white dark:bg-[#121212] text-gray-900 dark:text-[#0FDE72] border border-gray-300 dark:border-white/20 rounded px-3 py-1 text-sm focus:outline-none focus:border-[#0FDE72] focus:ring-1 focus:ring-[#0FDE72]"
            >
              <option value="Global">Global Average</option>
              <option value="US">United States</option>
              <option value="EU">European Union</option>
              <option value="India">India</option>
            </select>
          </div>

          <div className="space-y-8">
            {/* Vs Selected Region */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Vs {region} Baseline ({baselines[region]}t)</span>
                <span className="text-[#0FDE72] font-mono font-bold text-lg">{calculatePercentage(userTotal, baselines[region])}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                <div 
                  className="bg-[#0FDE72] h-3 rounded-full shadow-[0_0_12px_rgba(15,222,114,0.4)] dark:shadow-[0_0_12px_#0FDE72]" 
                  style={{ width: `${calculatePercentage(userTotal, baselines[region])}%` }}
                ></div>
              </div>
            </div>

            {/* Vs Paris Agreement */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Vs Paris 1.5°C Target (2.0t)</span>
                <span className="text-[#B026FF] font-mono font-bold text-lg">{calculatePercentage(userTotal, baselines.ParisTarget)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                <div 
                  className="bg-[#B026FF] h-3 rounded-full shadow-[0_0_12px_rgba(176,38,255,0.4)] dark:shadow-[0_0_12px_#B026FF]" 
                  style={{ width: `${calculatePercentage(userTotal, baselines.ParisTarget)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* RECHARTS ENGINE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-72 w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-xl p-5 flex flex-col">
            <h3 className="text-[#0FDE72] text-xs font-bold tracking-widest mb-4 uppercase">Emission Source Breakdown</h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={5}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #0FDE72', borderRadius: '8px', color: '#000' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="h-72 w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-xl p-5 flex flex-col">
            <h3 className="text-[#00D1FF] text-xs font-bold tracking-widest mb-4 uppercase">Historical Trend Matrix</h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #00D1FF', borderRadius: '8px', color: '#000' }} />
                  <Line type="monotone" dataKey="emissions" stroke="#00D1FF" strokeWidth={3} dot={{ fill: '#fff', stroke: '#00D1FF', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
