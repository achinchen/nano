import { useCalendarContext } from '../context';
import Year from './Year';
import Month from './Month';
import Week from './Week';
import Day from './Day';

function CalendarMode() {
  const { selectedDate, today, mode } = useCalendarContext();
  const props = { selectedDate, today };

  if (mode === 'Day') return <Day {...props} />;
  if (mode === 'Week') return <Week {...props} />;
  if (mode === 'Month') return <Month {...props} />;
  if (mode === 'Year') return <Year {...props} />;
  return null;
}

export default CalendarMode;
