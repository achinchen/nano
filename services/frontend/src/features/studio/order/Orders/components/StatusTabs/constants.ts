import i from '~frontend/features/studio/i.json';
import { STATUS } from '~frontend/features/studio/order/Orders/constants';

export const STATUS_ITEMS = [
  {
    icon: 'i-solar-notes-minimalistic-bold',
    label: i.processing,
    value: STATUS.IN_PROGRESS,
  },
  {
    icon: 'i-solar-bag-bold',
    label: i.end,
    value: STATUS.END,
  },
];
