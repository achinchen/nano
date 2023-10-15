import { dayjs } from  '~frontend/utils/date';

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
