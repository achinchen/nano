import zhTW from 'dayjs/locale/zh-tw';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import dayjs, { extend, locale } from 'dayjs';
import i from './i.json';

locale('zh-tw', zhTW);
extend(weekday);
extend(localizedFormat);

export { dayjs };

export const getDateString = (date: Date) => date.toISOString().slice(0, 10);

export const getMMDD = (date: Date) => {
  return `${dayjs(date).format('MMMDD')}${i.day}`;
};

export const formateDate = (date: Date) => {
  const target = dayjs(date);
  const shouldShowYear = target.year() !== dayjs().year();
  if (shouldShowYear) return target.format('YYYY/MM/DD dddd');
  return target.format('LL dddd').slice(5);
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
