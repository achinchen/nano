import { STATUSES } from './constants';

export type Status = (typeof STATUSES)[number];
export type Content = { name: string; id: number };
