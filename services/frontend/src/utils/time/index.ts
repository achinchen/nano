import zhTW from 'dayjs/locale/zh-tw';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs, { locale, extend } from 'dayjs';
import i from '~frontend/shared/i.json';

extend(relativeTime);
locale('zh-tw', zhTW);

const HOUR = 60;

export const getDurationByStartAtAndEndAt = (
  startAt: Date | string,
  endAt: Date | string
) => {
  const start = dayjs(startAt);
  const end = dayjs(endAt)
    .set('month', start.get('month'))
    .set('date', start.get('date'));
  return end.diff(start, 'minute');
};

export const formatDuration = (duration: number) => {
  if (duration < HOUR) return `${duration} ${i.unit.minute}`;

  const hour = Math.floor(duration / HOUR);
  const minute = duration % HOUR;
  return `${hour} ${i.unit.hour} ${
    minute > 0 ? `${minute} ${i.unit.minute}` : ''
  }`;
};

const SEPARATOR = ' - ';

export const getPeriodTime = (datetime: Date | string, duration: number) => {
  const start = dayjs(datetime);
  const end = dayjs(datetime).add(duration, 'minute');
  return `${start.format('A hh:mm')}${SEPARATOR}${end.format(
    'A hh:mm'
  )}`.replace('早上', '上午');
};

export const getPeriodTimes = (datetime: Date | string, duration: number) => {
  const timePeriod = getPeriodTime(datetime, duration);
  return timePeriod.split(SEPARATOR);
};

export const getTime = (datetime: Date | string) => {
  return dayjs(datetime).format('A hh:mm').replace('早上', '上午');
};

export const getPlainTime = (datetime: Date | string) => {
  return dayjs(datetime).format('HH:mm');
};

export const getPlainPeriodTimes = (
  datetime: Date | string,
  duration: number
) => {
  const start = dayjs(datetime).format('HH:mm');
  const end = dayjs(datetime).add(duration, 'minute').format('HH:mm');

  return [start, end];
};

export const getRelativeTime = (datetime: Date | string) => {
  return dayjs(datetime).from('2023-12-31T23:59:59Z');
};

export const addMinutes = (datetime: Date | string, minutes: number) => {
  return dayjs(datetime).add(minutes, 'minute').format('HH:mm');
};

export const isBefore = (timeA: string, timeB: string) => {
  const [hourA, minuteA] = timeA.split(':').map(Number);
  const [hourB, minuteB] = timeB.split(':').map(Number);
  return hourA <= hourB || (hourA === hourB && minuteA <= minuteB);
};
