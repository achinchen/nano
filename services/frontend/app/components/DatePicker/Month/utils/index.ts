import dayjs, { extend } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
extend(weekday);

const DAYS_IN_CALENDAR = 42;

export const getMonthDays = (date: Date) => {
  const targetDay = dayjs(date);
  const firstDay = targetDay.startOf('month');
  const weekday = firstDay.weekday();
  let day = firstDay.subtract(weekday, 'day');

  return Array.from({ length: DAYS_IN_CALENDAR }, () => {
    const result = {
      month: day.month() + 1,
      day: day.date(),
      weekday: day.weekday(),
    };

    day = day.add(1, 'day');
    return result;
  });
};