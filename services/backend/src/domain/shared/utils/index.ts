import dayjs from 'dayjs';

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

export const setDateTime = (date: Date | string, time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  return dayjs(date).set('hour', hour).set('minute', minute).toDate();
};
