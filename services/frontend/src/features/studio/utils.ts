import { getMMDD, getYYYYMMDD } from '~frontend/utils/date';

export const formateDate = (date: string) => {
  const today = new Date();
  const target = new Date(date);
  const isThisYear = today.getFullYear() === target.getFullYear();
  return isThisYear ? getMMDD(target) : getYYYYMMDD(target);
};
