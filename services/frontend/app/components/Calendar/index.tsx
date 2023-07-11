'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader';
import CalendarYear from './CalendarYear';
import CalendarMonth from './CalendarMonth';
import CalendarWeek from './CalendarWeek';
import CalendarDay from './CalendarDay';
import { PANEL_MODES } from './constants';
import { Mode } from './types';

const today = dayjs();

const Calendar = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [mode, updateMode] = useState<Mode>(PANEL_MODES[1]);

  const updateSelectedDate =
    ({ isPrevious }: { isPrevious: boolean }) =>
    () => {
      const newDate = isPrevious ? selectedDate.subtract(1, 'month') : selectedDate.add(1, 'month');
      setSelectedDate(newDate);
    };

  const day = selectedDate.format('D');
  const month = selectedDate.format('MMMM');
  const year = selectedDate.format('YYYY');

  const getCalendar = () => {
    const props = { today, selectedDate };

    switch (mode) {
      case 'Year':
        return <CalendarYear {...props} />;
      case 'Month':
        return <CalendarMonth {...props} />;
      case 'Week':
        return <CalendarWeek {...props} />;
      case 'Day':
        return <CalendarDay {...props} />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col text-gray-800">
      <CalendarHeader mode={mode} updateMode={updateMode} />
      <header className="flex justify-between p-2">
        <h1 className="text-3xl font-bold">
          {mode !== 'Year' && `${month} ${mode !== 'Day' ? '' : `${day}, `}`}
          <span className="font-normal">{year}</span>
        </h1>
        <div className="flex">
          <button
            className="rounded p-1 focus:border-1 focus:border-blue-300 focus:border-solid md:p-2 focus:shadow focus:outline-none"
            type="button"
            onClick={updateSelectedDate({ isPrevious: true })}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            className="mx-2 p-1 focus:border-1 focus:border-blue-300 focus:border-solid md:p-2 focus:shadow focus:outline-none"
            type="button"
            onClick={() => setSelectedDate(today)}
          >
            Today
          </button>
          <button
            className="rounded p-1 focus:border-1 focus:border-blue-300 focus:border-solid md:p-2 focus:shadow focus:outline-none"
            type="button"
            onClick={updateSelectedDate({ isPrevious: false })}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </header>
      {getCalendar()}
    </main>
  );
};

export default Calendar;
