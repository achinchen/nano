import type { ServiceOrder } from '../types';
import { isBefore } from '~frontend/utils/date';

let today: Date;

export const isExpiredServices = (times: ServiceOrder['times']) => {
  today = new Date();
  return times.some((time) => isBefore(today, new Date(time)));
};
