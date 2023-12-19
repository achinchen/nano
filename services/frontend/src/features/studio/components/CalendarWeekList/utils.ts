import { FULL_TIME_OPTIONS } from './constants';

export const getTimeOptions = (startTime: string, endTime: string) => {
  const [startHour] = startTime.split(':');
  const [endHour] = endTime.split(':');
  const options = FULL_TIME_OPTIONS.slice(
    Number(startHour) - 1,
    Number(endHour)
  );
  return options;
};

const UNIT_HEIGHT = {
  LOOSE: 15,
  TIGHT: 12,
};
const ONE_QUARTER_HOUR = 15;
const QUARTER = 4;

const getUnitHeight = (loose: boolean) =>
  UNIT_HEIGHT[loose ? 'LOOSE' : 'TIGHT'];

export const getHeightByDuration = (duration: number, loose: boolean) => {
  const height = Math.ceil(duration / ONE_QUARTER_HOUR) * getUnitHeight(loose);
  return height;
};

export const getTopByTimeAndOpenTime = (
  startAt: string,
  openTime: string,
  loose: boolean
) => {
  const [hour] = openTime.split(':');
  const startHour = new Date(startAt).getHours();
  const top = (startHour - Number(hour)) * QUARTER * getUnitHeight(loose);
  return top;
};
