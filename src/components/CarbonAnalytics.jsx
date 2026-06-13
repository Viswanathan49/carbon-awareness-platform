import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

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

export default function CarbonAnalytics() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">Carbon Telemetry</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 w-full bg-black/40 border border-white/5 rounded-xl p-4">
          <h3 className="text-[#0FDE72] text-xs font-bold tracking-widest mb-2 uppercase">Emission Source Breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #0FDE72', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-64 w-full bg-black/40 border border-white/5 rounded-xl p-4">
          <h3 className="text-[#00D1FF] text-xs font-bold tracking-widest mb-2 uppercase">Historical Trend Matrix</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #00D1FF', borderRadius: '8px' }}
              />
              <Line
                type="monotone"
                dataKey="emissions"
                stroke="#00D1FF"
                strokeWidth={3}
                dot={{ fill: '#121212', stroke: '#00D1FF', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
