import { SERVICE_COLOR } from './constants';

const { length } = SERVICE_COLOR;

export const getServiceColorById = (id: number) => {
  return SERVICE_COLOR[id % length];
};
