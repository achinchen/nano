import type { Props } from './type';
import { Fragment, useMemo } from 'react';
import { weekDays, getDay, getMonth } from '~frontend/components/Calendar/utils';
import { HOURS, DAYS } from '~frontend/components/Calendar/constants';

const Week = ({ selectedDate, today }: Props) => {
  const todayDay = getDay(today);
  const todayMonth = getMonth(today);
  const currentWeek = useMemo(() => weekDays(selectedDate), [selectedDate]);

  return (
    <ol className="grid grid-cols-8 gap-px bg-gray-300">
      <li className="sticky top-0 bg-white py-1" />
      {currentWeek.map(({ month, day }, index) => (
        <Fragment key={`${month}-${day}-${DAYS[index]}`}>
          <li className="sticky top-0 flex items-center justify-center bg-white py-2">
            <span className="inline-block w-4 overflow-hidden tracking-widest -mr-1 md:mr-0 md:w-auto md:tracking-normal">
              {DAYS[index]}{' '}
            </span>
            <span
              className={`flex justify-center items-center p-1 w-6 h-6 md:ml-1 ${
                month === todayMonth && day === todayDay && 'rounded-full text-white bg-red-500'
              }`}
            >
              {day}
            </span>
          </li>
        </Fragment>
      ))}
      {Array.from({ length: 8 }).map((_, index) => (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="sticky top-10 border-x-0 border-y-1 border-gray-300 border-solid bg-white p-2 pl-0 text-right text-sm text-gray-600 -my-1"
        >
          {index ? '' : 'all day'}
        </li>
      ))}
      {HOURS.map((HOUR, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={`${HOUR}-${index}`}>
          <li className="bg-white p-2 pl-0 text-right text-sm text-gray-600">{HOUR}</li>
          {Array.from({ length: 7 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="bg-white" />
          ))}
        </Fragment>
      ))}
    </ol>
  );
};

export default Week;
