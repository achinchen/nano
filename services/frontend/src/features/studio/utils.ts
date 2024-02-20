import { isBefore, getMMDD, getYYYYMMDD } from '~frontend/utils/date';
import { ServiceDetail } from './types';

export const formateDate = (date: string) => {
  const today = new Date();
  const target = new Date(date);
  const isThisYear = today.getFullYear() === target.getFullYear();
  return isThisYear ? getMMDD(target) : getYYYYMMDD(target);
};

export const isEndService = (endAt: ServiceDetail['endAt']) =>
  isBefore(new Date('2024-01-01'), new Date(endAt));
