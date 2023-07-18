import type { ManipulateType } from 'dayjs';
import { useMemo } from 'react';
import { useCalendarContext } from '~frontend/components/Calendar/context';
import { getToday } from '~frontend/components/Calendar/utils';
import { getLabel } from './utils';

function Header() {
  const { mode, selectedDate, setSelectedDate, updateToday } =
    useCalendarContext();
  const currentUnit = useMemo(() => {
    if (mode === 'Day') return 'week';
    return mode.toLowerCase() as ManipulateType;
  }, [mode]);

  const onPrevious = () => {
    setSelectedDate((selectedDate) => selectedDate.subtract(1, currentUnit));
  };

  const resetToday = () => {
    const today = getToday();
    updateToday(today);
    setSelectedDate(today);
  };

  const onNext = () => {
    setSelectedDate((selectedDate) => selectedDate.add(1, currentUnit));
  };

  const day = selectedDate.format('D');
  const month = selectedDate.format('MMMM');
  const year = selectedDate.format('YYYY');

  return (
    <header className="flex justify-between p-2">
      <h1 className="text-3xl font-bold">
        {getLabel({ mode, day, month })}
        <span className="ml-2 font-normal">{year}</span>
      </h1>
      <div className="flex">
        <button
          className="rounded p-1 focus:border-1 focus:border-blue-300 focus:border-solid md:p-2 focus:shadow focus:outline-none"
          type="button"
          onClick={onPrevious}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          className="mx-2 p-1 focus:border-1 focus:border-blue-300 focus:border-solid md:p-2 focus:shadow focus:outline-none"
          type="button"
          onClick={resetToday}
        >
          Today
        </button>
        <button
          className="rounded p-1 focus:border-1 focus:border-blue-300 focus:border-solid md:p-2 focus:shadow focus:outline-none"
          type="button"
          onClick={onNext}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
