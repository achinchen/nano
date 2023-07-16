import { MODES } from '../constants';
import { Mode } from '../type';
import { useCalendarContext } from '../context';

const CalendarModeSwitcher = () => {
  const { mode: currentMode, updateMode } = useCalendarContext();

  const onClick = (targetMode: Mode) => () => {
    if (currentMode === targetMode) return;
    updateMode(targetMode);
  };

  return (
    <nav className="flex justify-center border-b border-gray-300 border-solid p-2">
      <ol className="flex border-gray-300 rounded-md border-solid bg-gray-200">
        {MODES.map((MODE) => (
          <li
            key={MODE}
            className={`flex w-16 h-6 border-l first:rounded-l-md last:rounded-r-md first:border-l-0 
              ${MODE === currentMode ? 'bg-white text-gray-800' : 'text-gray-600'}
            `}
          >
            <button
              className="w-full focus:border-blue-300 focus:border-solid focus:shadow focus:outline-none"
              onClick={onClick(MODE)}
            >
              {MODE}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CalendarModeSwitcher;
