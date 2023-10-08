import i from './i.json';

export const formatDuration = (duration: number) => {
  if (duration < 60) return `${duration}${i.unit.minute}`;

  const hour = Math.floor(duration / 60);
  const minute = duration % 60;
  return `${hour}${i.unit.hour}${
    minute > 0 ? `${minute}${i.unit.minute}` : ''
  }`;
};
