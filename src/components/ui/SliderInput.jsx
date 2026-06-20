

export const SliderInput = ({ id, label, value, min, max, onChange, unit, color }) => (
  <div className="flex flex-col gap-3">
    <div className="flex justify-between items-end">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      <span className="text-sm font-bold px-3 py-1 bg-white dark:bg-[#111] rounded-full border border-gray-100 dark:border-gray-800 shadow-sm" style={{ color }}>
        {value} {unit}
      </span>
    </div>
    <input 
      id={id} 
      type="range" 
      min={min} 
      max={max} 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer"
      style={{ accentColor: color }}
    />
  </div>
);
