import React from 'react';

const modules = [
  {
    title: 'Dynamic Tracking',
    icon: '📊',
    description: 'Log and audit your personal metrics, transport parameters, and utility data directly via client-side execution pipelines.',
    accent: '#0FDE72',
    bg: 'bg-[#0FDE72]/5 dark:bg-[#0FDE72]/5',
    border: 'border-[#0FDE72]/20',
    iconBg: 'bg-[#0FDE72]/10',
  },
  {
    title: 'Personalized Insights',
    icon: '💡',
    description: 'Context-aware optimizations engineered to identify your highest-impact reduction opportunities based on real emission factors.',
    accent: '#00D1FF',
    bg: 'bg-[#00D1FF]/5 dark:bg-[#00D1FF]/5',
    border: 'border-[#00D1FF]/20',
    iconBg: 'bg-[#00D1FF]/10',
  },
  {
    title: 'Gamified Rewards',
    icon: '🏆',
    description: 'Accumulate eco points, track reduction streaks, and unlock achievements by converting carbon insights into active daily habits.',
    accent: '#B026FF',
    bg: 'bg-[#B026FF]/5 dark:bg-[#B026FF]/5',
    border: 'border-[#B026FF]/20',
    iconBg: 'bg-[#B026FF]/10',
  }
];

export default function CommandModules() {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 relative z-10 clear-both">

      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Advanced{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0FDE72] to-[#00D1FF]">
            Command Modules
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium max-w-xl mx-auto">
          Every feature engineered for zero-latency, zero-database performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod, idx) => (
          <div
            key={idx}
            className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-[#111111] ${mod.border}`}
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(to right, ${mod.accent}, transparent)` }}
            />

            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${mod.iconBg}`}
            >
              {mod.icon}
            </div>

            {/* Title */}
            <h3
              className="text-base font-bold mb-2 text-gray-900 dark:text-white"
            >
              {mod.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
              {mod.description}
            </p>

            {/* Bottom accent dot */}
            <div className="mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: mod.accent }} />
              <span className="text-xs font-medium" style={{ color: mod.accent }}>Active</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
