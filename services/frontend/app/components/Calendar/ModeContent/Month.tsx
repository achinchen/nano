import type { Props } from './type';
import { Fragment, useMemo } from 'react';
import { DAYS } from '~frontend/components/Calendar/constants';
import { getMonth, getDay, monthDays } from '~frontend/components/Calendar/utils';

const Month = ({ selectedDate, today }: Props) => {
  const todayDay = getDay(today);
  const todayMonth = getMonth(today);
  const selectedMonth = getMonth(selectedDate);
  const daysInMonth = useMemo(() => monthDays(selectedDate), [selectedDate]);

  return (
    <Fragment>
      <ol className="grid grid-cols-7 my-1 h-6 text-right">
        {DAYS.map((DAY) => (
          <li key={DAY} className="pr-2">
            {DAY}
          </li>
        ))}
      </ol>
      <ol className="grid grid-cols-7 grid-rows-6 flex-1 border-collapse gap-px border border-gray-300 border-solid bg-gray-300 text-right">
        {daysInMonth.map(({ month, day }) => (
          <li
            key={`${month}-${day}`}
            className={`relative p-1 ${month !== selectedMonth ? 'bg-gray-200 text-gray-600' : 'bg-white '}`}
          >
            <span
              className={`absolute top-0 right-0 inline-block m-1 p-1 w-8 flex justify-center content-end 
                ${month === todayMonth && day === todayDay && 'rounded-full text-white bg-red-500'}
              `}
            >
              {day}
            </span>
          </li>
        ))}
      </ol>
    </Fragment>
  );
};

export default Month;
