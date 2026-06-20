import React from 'react';

const modules = [
  {
    title: 'Dynamic Tracking',
    icon: '📊',
    description: 'Log and audit your personal metrics, transport parameters, and utility parameters directly via client execution pipelines.',
    color: 'from-[#0FDE72] to-emerald-500'
  },
  {
    title: 'Personalized Insights',
    icon: '💡',
    description: 'Context-aware optimizations engineered to point out high-impact reduction items specific to your footprint signatures.',
    color: 'from-[#00D1FF] to-blue-500'
  },
  {
    title: 'Gamified Rewards',
    icon: '🏆',
    description: 'Accumulate experience points, track streaks, and unlock achievements by converting carbon insights into active habits.',
    color: 'from-[#B026FF] to-purple-600'
  }
];

export default function CommandModules() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 relative z-10 clear-both">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Advanced Command Modules
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Every feature engineered for zero-latency, zero-database performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modules.map((mod, idx) => (
          <div key={idx} className="group relative bg-white dark:bg-[#111111] p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${mod.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="text-4xl mb-6 bg-gray-50 dark:bg-black/40 w-16 h-16 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/5 shadow-inner">
              {mod.icon}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {mod.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
              {mod.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
