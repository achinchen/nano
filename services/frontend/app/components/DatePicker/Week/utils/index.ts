import dayjs, { extend } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
extend(weekday);

const WEEKDAY = 7;

export const getWeekDays = (date: Date) => {
  const targetDay = dayjs(date);
  const targetWeekday = targetDay.weekday();
  let day = targetDay.subtract(targetWeekday, 'day');

  return Array.from({ length: WEEKDAY }, () => {
    const result = {
      month: day.month() + 1,
      day: day.date(),
      weekday: day.weekday(),
    };

    day = day.add(1, 'day');
    return result;
  });
};
