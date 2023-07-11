import { PANEL_MODES } from './constants';
import { Mode } from './types';

type Props = {
  mode: Mode;
  updateMode: (mode: Mode) => void;
};

const CalendarHeader = ({ mode, updateMode }: Props) => {
  const onClick = (newMode: Mode) => () => {
    if (mode === newMode) return;
    updateMode(newMode);
  };
  return (
    <nav className="flex justify-center border-b border-gray-300 border-solid p-2">
      <ol className="flex border-gray-300 rounded-md border-solid bg-gray-200">
        {PANEL_MODES.map((MODE) => (
          <li
            key={MODE}
            className={`flex w-16 h-6 border-l first:rounded-l-md last:rounded-r-md first:border-l-0 
              ${MODE === mode ? 'bg-white text-gray-800' : 'text-gray-600'}
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

export default CalendarHeader;
