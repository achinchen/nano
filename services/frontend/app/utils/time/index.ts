import zhTW from 'dayjs/locale/zh-tw';
import dayjs, { locale } from 'dayjs';
import i from '~frontend/shared/i.json';

locale('zh-tw', zhTW);

export const formatDuration = (duration: number) => {
  if (duration < 60) return `${duration}${i.unit.minute}`;

  const hour = Math.floor(duration / 60);
  const minute = duration % 60;
  return `${hour}${i.unit.hour}${
    minute > 0 ? `${minute}${i.unit.minute}` : ''
  }`;
};

export const getPeriodTime = (datetime: Date | string, duration: number) => {
  const start = dayjs(datetime);
  const end = dayjs(datetime).add(duration, 'minute');
  return `${start.format('A HH:mm')} - ${end.format('A HH:mm')}`;
};
