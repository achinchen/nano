import { PANEL_MODES } from './constants';

export type Mode = (typeof PANEL_MODES)[number];
export type Day = { month: number; day: number };
