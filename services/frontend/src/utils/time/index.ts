import zhTW from 'dayjs/locale/zh-tw';
import dayjs, { locale } from 'dayjs';
import i from '~frontend/shared/i.json';

locale('zh-tw', zhTW);

const HOUR = 60;

export const formatDuration = (duration: number) => {
  if (duration < HOUR) return `${duration} ${i.unit.minute}`;

  const hour = Math.floor(duration / HOUR);
  const minute = duration % HOUR;
  return `${hour} ${i.unit.hour} ${
    minute > 0 ? `${minute} ${i.unit.minute}` : ''
  }`;
};

export const getPeriodTime = (datetime: Date | string, duration: number) => {
  const start = dayjs(datetime);
  const end = dayjs(datetime).add(duration, 'minute');
  return `${start.format('A HH:mm')} - ${end.format('A HH:mm')}`;
};
