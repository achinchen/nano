import { MODES } from './constants';

export type Mode = (typeof MODES)[number];
export type Day = { month: number; day: number };
