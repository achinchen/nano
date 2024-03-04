import type {
  OrderDetailWithStatus,
  OrderStatus,
} from '~frontend/features/my/order/types';
import { ORDER as MOCK_ORDER } from '~frontend/shared/mock';

export const ORDER = {
  request: [MOCK_ORDER.REQUESTED[0]].map((order) => ({
    ...order,
    status: 'request',
  })),
  coming: [MOCK_ORDER.IN_PROGRESS[0]].map((order) => ({
    ...order,
    status: 'coming',
  })),
  end: [MOCK_ORDER.END[0]].map((order) => ({
    ...order,
    status: 'end',
  })),
} as unknown as { [key in OrderStatus]: OrderDetailWithStatus[] };

export const ORDERS = Object.values(ORDER).flat();
