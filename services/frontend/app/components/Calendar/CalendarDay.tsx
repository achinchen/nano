import { Fragment, useMemo } from 'react';
import dayjs from 'dayjs';
import { weekDays, getDay, getMonth } from './utils';
import { HOURS, DAYS } from './constants';

type Props = {
  selectedDate: dayjs.Dayjs;
  today: dayjs.Dayjs;
};

const CalendarDay = ({ selectedDate, today }: Props) => {
  const currentWeek = useMemo(() => weekDays(selectedDate), [selectedDate]);
  const todayDay = getDay(today);
  const todayMonth = getMonth(today);
  const selectedDay = getDay(selectedDate);
  const selectedMonth = getMonth(selectedDate);

  const todayIsSelected = todayDay === selectedDay && todayMonth === selectedMonth;

  return (
    <Fragment>
      <ol className="sticky top-0 flex justify-around bg-white text-center text-sm">
        {currentWeek.map(({ month, day }, index) => (
          <li key={`${month}-${day}-${DAYS[index]}`} className="w-1/7 flex flex-col items-center py-2">
            <span className="h-5 w-4 overflow-hidden break-all tracking-widest md:h-auto md:w-auto md:overflow-visible md:break-words md:tracking-normal">
              {DAYS[index]}
            </span>
            <span
              className={`flex justify-center items-center p-1 w-6 h-6 text-lg rounded-full
                ${
                  month === selectedMonth && day === selectedDay && todayIsSelected
                    ? 'text-white bg-red-500'
                    : (month === selectedMonth && day === selectedDay && 'text-white bg-gray-500') ||
                      (month === todayMonth && day === todayDay && 'text-red-500')
                }`}
            >
              {day}
            </span>
          </li>
        ))}
      </ol>
      <div className="sticky top-14 border-y border-gray-300 border-solid bg-white p-2 text-sm text-gray-600">
        all day
      </div>
      <ol className="text-sm text-gray-600">
        {HOURS.map((HOUR, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`${HOUR}-${index}`}>
            <li className="border-b border-t-0 border-gray-300 border-solid p-2">{HOUR}</li>
          </Fragment>
        ))}
      </ol>
    </Fragment>
  );
};

export default CalendarDay;
