import dayjs, { extend } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { Day } from './type';

extend(weekday);
extend(weekYear);
extend(weekOfYear);

export const getMonth = (date: dayjs.Dayjs): number => Number(date.format('M'));
export const getDay = (date: dayjs.Dayjs): number => Number(date.format('D'));
export const getYear = (date: dayjs.Dayjs): number =>
  Number(date.format('YYYY'));

export const getToday = (): dayjs.Dayjs => dayjs();

export const theMonthDays = (date: dayjs.Dayjs): Day[] => {
  const theMonth = getMonth(date);

  return Array.from({ length: date.daysInMonth() }, (_, i) => ({
    month: theMonth,
    day: i + 1,
  }));
};

export const monthDays = (date: dayjs.Dayjs): Day[] => {
  const firstDay = date.startOf('month');
  const weekday = firstDay.weekday();
  let day = firstDay.subtract(weekday ? weekday - 1 : 7, 'day');

  return Array.from({ length: 42 }, () => {
    const result = {
      month: getMonth(day),
      day: getDay(day),
    };

    day = day.add(1, 'day');
    return result;
  });
};

export const monthDaysInYear = (year: number): Day[][] => {
  let month = dayjs(`${year}-01-01`);

  return Array.from({ length: 12 }, () => {
    const days = monthDays(month);
    month = month.add(1, 'month');
    return days;
  });
};

export const weekDays = (date: dayjs.Dayjs): Day[] => {
  const weekday = date.weekday();
  let day = date.subtract(weekday ? weekday - 1 : weekday, 'day');

  return Array.from({ length: 7 }, () => {
    const result = {
      month: getMonth(day),
      day: getDay(day),
    };

    day = day.add(1, 'day');
    return result;
  });
};
