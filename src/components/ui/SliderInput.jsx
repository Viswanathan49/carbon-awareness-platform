

import PropTypes from 'prop-types';

/**
 * SliderInput component for selecting numerical values.
 *
 * @param {Object} props - Component props
 * @param {string} props.id - HTML ID for the input element
 * @param {string} props.label - Display label for the slider
 * @param {number} props.value - Current value of the slider
 * @param {string|number} props.min - Minimum allowed value
 * @param {string|number} props.max - Maximum allowed value
 * @param {function} props.onChange - Callback fired when value changes
 * @param {string} props.unit - Unit to display next to the value (e.g. "km")
 * @param {string} props.color - Hex color code for the slider accent
 */
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

SliderInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
