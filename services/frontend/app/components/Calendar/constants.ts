import type { Status } from './types';

export const STATUSES = ['available', 'full', 'has-order'] as const;

const STATUS_BASE_CLASS = 'absolute bottom--1.5 inline-block h-2 w-2 rounded';
export const STATUS_CLASS: { [key in Status | 'default']: string } = {
  available: `bg-primary-300 ${STATUS_BASE_CLASS}`,
  'has-order': `bg-yellow-500 ${STATUS_BASE_CLASS}`,
  full: `bg-zinc-200 ${STATUS_BASE_CLASS}`,
  default: `bg-transparent ${STATUS_BASE_CLASS}`,
};
