import { getAfter, getBefore } from '~frontend/utils/date';

const DAYS = 7;
export const getPreviousWeek = (date: Date) => getBefore(date, DAYS);
export const getNextWeek = (date: Date) => getAfter(date, DAYS);
