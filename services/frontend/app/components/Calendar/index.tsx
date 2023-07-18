'use client';

import ModeSwitcher from './ModeSwitcher';
import Header from './Header';
import ModeContent from './ModeContent';
import { CalendarContextProvider, useCalendarContext } from './context';
import { getToday } from './utils';

const today = getToday();

function Calendar() {
  const { selectedDate, setSelectedDate, mode } = useCalendarContext();
  const updateSelectedDate =
    ({ isPrevious }: { isPrevious: boolean }) =>
    () => {
      const newDate = isPrevious
        ? selectedDate.subtract(1, 'month')
        : selectedDate.add(1, 'month');
      setSelectedDate(newDate);
    };

  const day = selectedDate.format('D');
  const month = selectedDate.format('MMMM');
  const year = selectedDate.format('YYYY');

  return (
    <CalendarContextProvider>
      <main className="min-h-screen flex flex-col text-gray-800">
        <ModeSwitcher />
        <Header />
        <ModeContent />
      </main>
    </CalendarContextProvider>
  );
}

function CalendarWithProvider() {
  return (
    <CalendarContextProvider>
      <Calendar />
    </CalendarContextProvider>
  );
}

export default CalendarWithProvider;
