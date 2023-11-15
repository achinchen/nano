import type { ManipulateType } from 'dayjs';
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

export const getLocaleMMDD = (date: Date) => {
  return `${dayjs(date).format('MMDD')}${i.day}`;
};

export const getMMDD = (date: Date) => {
  return dayjs(date).format('MM/DD');
};

export const formateDate = (date: Date) => {
  const target = dayjs(date);
  const shouldShowYear = target.year() !== dayjs().year();
  if (shouldShowYear) return target.format('LL dddd');
  return target.format('LL dddd').slice(5);
};

export const getFirstDateInPreviousMonth = (date: Date) => {
  return dayjs(date).subtract(1, 'month').set('date', 1).toDate();
};

export const getFirstDateInNextMonth = (date: Date) => {
  return dayjs(date).add(1, 'month').set('date', 1).toDate();
};

export const getBefore = (
  date: Date,
  day: number,
  unit: ManipulateType = 'day'
) => {
  return dayjs(date).add(day, unit).toDate();
};

export const getAfter = (
  date: Date,
  day: number,
  unit: ManipulateType = 'day'
) => {
  return dayjs(date).subtract(day, unit).toDate();
};

export const isBefore = (dateA: Date, dateB: Date) => {
  return dateB < dateA;
};
