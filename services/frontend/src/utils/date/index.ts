import type { ManipulateType } from 'dayjs';
import zhTW from 'dayjs/locale/zh-tw';
import localizedFormatPlugin from 'dayjs/plugin/localizedFormat';
import weekdayPlugin from 'dayjs/plugin/weekday';
import isTodayPlugin from 'dayjs/plugin/isToday';
import isTomorrowPlugin from 'dayjs/plugin/isTomorrow';
import dayjs, { extend, locale } from 'dayjs';
import i from './i.json';

locale('zh-tw', zhTW);
extend(weekdayPlugin);
extend(localizedFormatPlugin);
extend(isTodayPlugin);
extend(isTomorrowPlugin);

export { dayjs };

export const getDateString = (date: Date) => date.toISOString().slice(0, 10);

export const formateDateTime = (date: Date) => {
  const target = dayjs(date);
  const shouldShowYear = target.year() !== dayjs().year();
  if (shouldShowYear) return target.format('YYYY/MM/DD A hh:mm');
  return target.format('MM/DD A hh:mm');
};

export const getLocaleMMDD = (date: Date) => {
  return `${dayjs(date).format('MMMDD')}${i.day}`;
};

export const getMMDD = (date: Date | string) => {
  return dayjs(date).format('MM/DD');
};

export const getYYYYMMDD = (date: Date | string) => {
  return dayjs(date).format('YYYY/MM/DD');
};

export const getLocaleYYYYMMDD = (date: Date) => {
  return dayjs(date).format('LL');
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

export const getPreviousWeek = (date: Date) =>
  dayjs(date).subtract(7, 'day').toDate();
export const getNextWeek = (date: Date) => dayjs(date).add(7, 'day').toDate();

export const getBefore = (
  date: Date,
  day: number,
  unit: ManipulateType = 'day'
) => {
  return dayjs(date).subtract(day, unit).toDate();
};

export const getAfter = (
  date: Date,
  day: number,
  unit: ManipulateType = 'day'
) => {
  return dayjs(date).add(day, unit).toDate();
};

export const isBefore = (dateA: Date, dateB: Date) => {
  return dateB < dateA;
};

export const isTomorrow = (date: Date) => {
  return dayjs(date).isTomorrow();
};

export function isToday(date: Date) {
  return dayjs(date).isToday();
}
