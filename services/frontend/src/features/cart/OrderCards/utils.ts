import type { ServiceOrder } from '../types';
import { isBefore } from '~frontend/utils/date';

let today: Date;

export const isExpiredServices = (times: ServiceOrder['times']) => {
  today = new Date('2024-01-01');
  return times.some((time) => isBefore(today, new Date(time)));
};
