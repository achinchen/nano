import type { OrderStatus } from '~frontend/features/my/order/types';
import i from '~frontend/features/my/order/i.json';

type Props = {
  status: OrderStatus;
};

export default function StatusTitle({ status }: Props) {
  return <h3 className="mt-6 text-lg first:mt-0">{i[status]}</h3>;
}
