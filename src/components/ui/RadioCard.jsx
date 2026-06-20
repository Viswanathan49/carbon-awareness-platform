import PropTypes from 'prop-types';

/**
 * RadioCard component for selecting an option with a visual card layout.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Display text for the radio option
 * @param {string} props.emoji - Emoji icon for visual representation
 * @param {string|number} props.value - The internal value of this option
 * @param {string|number} props.current - The currently selected value in the parent state
 * @param {function} props.onChange - Callback fired when this card is clicked
 * @param {string} props.color - Hex color code for the selected state accent
 */
export const RadioCard = ({ label, emoji, value, current, onChange, color }) => {
  const isSelected = value === current;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all duration-300 items-center justify-center text-center outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#121212] ${
        isSelected
          ? 'shadow-md scale-105'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#222]'
      }`}
      style={isSelected ? { borderColor: color, backgroundColor: `${color}15` } : {}}
    >
      <span className="text-2xl mb-2" aria-hidden="true">{emoji}</span>
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</span>
      
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: color }}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
      )}
    </button>
  );
};

RadioCard.propTypes = {
  label: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};
