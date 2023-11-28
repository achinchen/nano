import { CONTENT } from '~frontend/features/studio/ServicesContent/constants';
import i from './i.json';

export const CONTENT_ITEMS = [
  {
    icon: 'i-solar-notes-minimalistic-bold',
    label: i.process,
    value: CONTENT.IN_PROGRESS,
  },
  {
    icon: 'i-solar-bag-bold',
    label: i.end,
    value: CONTENT.END,
  },
];
