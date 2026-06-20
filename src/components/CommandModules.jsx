import React from 'react';

const modules = [
  {
    title: 'Dynamic Tracking',
    icon: '🧠',
    description: 'Log your daily commutes, diet choices, and utility usage to see your environmental footprint in real-time.',
    color: 'from-[#0FDE72] to-emerald-600'
  },
  {
    title: 'Personalized Insights',
    icon: '💡',
    description: 'Receive custom recommendations to reduce your footprint where it matters most, tailored to your specific habits.',
    color: 'from-[#FACC15] to-amber-500'
  },
  {
    title: 'Gamified Rewards',
    icon: '🏆',
    description: 'Complete challenges, build eco-friendly habits, and earn points as you transition to a low-carbon lifestyle.',
    color: 'from-[#B026FF] to-purple-600'
  }
];

export default function CommandModules() {
  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-4 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0FDE72] to-[#00D1FF]">
            Advanced Command Modules
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Every feature engineered for zero-latency, zero-database performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modules.map((mod, idx) => (
          <div 
            key={idx} 
            className="group relative bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >
            {/* Glowing Hover Effect */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${mod.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="text-4xl mb-6 bg-gray-50 dark:bg-[#111] w-16 h-16 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/5 shadow-inner">
              {mod.icon}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${mod.color}`}></span>
              {mod.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {mod.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
