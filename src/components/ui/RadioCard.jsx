

export const RadioCard = ({ label, emoji, value, current, onChange, color }) => {
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
