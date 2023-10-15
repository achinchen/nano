import dayjs, { extend } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
extend(weekday);

export { dayjs };

export const formatDate = (date: Date, weekday = false) => {
  const dateString = date.toLocaleDateString('zh-TW', {
    dateStyle: weekday ? 'full' : 'long',
  });
  return dateString;
};

export const getFirstDateInPreviousMonth = (date: Date) => {
  return dayjs(date).subtract(1, 'month').set('date', 1).toDate();
};

export const getFirstDateInNextMonth = (date: Date) => {
  return dayjs(date).add(1, 'month').set('date', 1).toDate();
};
