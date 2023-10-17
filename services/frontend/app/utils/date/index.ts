import zhTW from 'dayjs/locale/zh-tw';
import weekday from 'dayjs/plugin/weekday';
import dayjs, { extend, locale } from 'dayjs';
import i from './i.json';

locale('zh-tw', zhTW);
extend(weekday);

export { dayjs };

export const getMMDD = (date: Date) => {
  return `${dayjs(date).format('MMMDD')}${i.day}`;
};

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
