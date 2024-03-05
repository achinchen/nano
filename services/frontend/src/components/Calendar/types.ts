import { PROCESS_STATUSES } from './constants';

export type ProcessStatus = (typeof PROCESS_STATUSES)[number];
export type Content = { name: string; id: number };
