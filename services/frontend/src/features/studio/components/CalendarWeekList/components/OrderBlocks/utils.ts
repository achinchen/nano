import { SCALE_SIZE, DURATION_SCALE } from './constants';

export const getSizeByDuration = (duration: number) => {
  return duration < DURATION_SCALE.XS
    ? SCALE_SIZE.XS
    : duration < DURATION_SCALE.SM
    ? SCALE_SIZE.SM
    : SCALE_SIZE.MD;
};
