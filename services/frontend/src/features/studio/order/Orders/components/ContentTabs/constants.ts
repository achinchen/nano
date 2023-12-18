import i from '~frontend/features/studio/i.json';
import { CONTENT } from '~frontend/features/studio/ServicesContent/constants';

export const CONTENT_ITEMS = [
  {
    icon: 'i-solar-notes-minimalistic-bold',
    label: i.processing,
    value: CONTENT.IN_PROGRESS,
  },
  {
    icon: 'i-solar-bag-bold',
    label: i.end,
    value: CONTENT.END,
  },
];
