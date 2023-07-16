import { Mode } from '~frontend/components/Calendar/type';

type Parameters = {
  mode: Mode;
  day: string;
  month: string;
};

export const getLabel = ({ mode, day, month }: Parameters) => {
  if (mode === 'Year') return '';
  if (mode === 'Day') return `${month}`;
  return `${month}, ${day}`;
};
