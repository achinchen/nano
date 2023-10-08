import { unit } from './i.json';

export const formatDuration = (duration: number) => {
  if (duration < 60) return `${duration}${unit.minute}`;

  const hour = Math.floor(duration / 60);
  const minute = duration % 60;
  return `${hour}${unit.hour}${minute > 0 ? `${minute}${unit.minute}` : ''}`;
};
