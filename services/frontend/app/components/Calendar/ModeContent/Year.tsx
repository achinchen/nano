import type { Day } from '~frontend/components/Calendar/type';
import type { Props } from './type';
import { useMemo } from 'react';
import { MONTHS, DAYS_SHORT } from '~frontend/components/Calendar/constants';
import {
  getYear,
  getMonth,
  getDay,
  monthDaysInYear,
} from '~frontend/components/Calendar/utils';

const Year = ({ selectedDate, today }: Props) => {
  const todayDay = getDay(today);
  const todayMonth = getMonth(today);

  const selectedYear = getYear(selectedDate);

  const daysInMonth = useMemo(
    () => monthDaysInYear(selectedYear),
    [selectedYear]
  );

  const isToday = (monthIndex: number, { day, month }: Day) => {
    const theMonth = monthIndex + 1;
    return day === todayDay && todayMonth === theMonth && month === theMonth;
  };

  return (
    <ol className="grid m-4 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {daysInMonth.map((days, monthIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={`${selectedYear}-${monthIndex}`}>
          <ol>
            <li className="ml-2 text-xl text-red-600">{MONTHS[monthIndex]}</li>
            <li>
              <ol className="grid grid-cols-7 my-3 text-gray-600">
                {DAYS_SHORT.map((DAY, dayIndex) => (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${selectedYear}-${monthIndex}-${DAY}-${dayIndex}`}
                    className="w-8 text-center"
                  >
                    {DAY}
                  </li>
                ))}
              </ol>
            </li>
            <li>
              <ol className="grid grid-cols-7 grid-rows-6">
                {days.map(({ month, day }) => (
                  <li
                    key={`${selectedYear}-${month}-${day}`}
                    className={`${
                      month === monthIndex + 1
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }`}
                  >
                    <button
                      className={`h-8 focus:border-1 focus:border-blue-300 focus:border-solid focus:shadow focus:outline-none
                        ${
                          isToday(monthIndex, { month, day })
                            ? 'w-8 mx-0.5 rounded-full text-white bg-red-500'
                            : 'text-inherit w-8'
                        }`}
                    >
                      {day}
                    </button>
                  </li>
                ))}
              </ol>
            </li>
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default Year;
