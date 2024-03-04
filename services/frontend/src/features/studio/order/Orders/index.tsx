import type { Status } from './types';
import type { Order } from '~frontend/features/studio/types';
import { Fragment, useState } from 'react';
import { ORDER } from '~frontend/shared/mock';
import StatusTabs from './components/StatusTabs';
import OrderCardsWithDate from './components/OrderCardsWithDate';
import { STATUS } from './constants';

const getMockData = (status: Status) => {
  const mockOrders = status === STATUS.END ? ORDER.END : ORDER.IN_PROGRESS;

  return [...mockOrders].reduce((data, order) => {
    const orderDate = new Date(order.startAt);
    const dateString = `${orderDate.getFullYear()}-${
      orderDate.getMonth() + 1
    }-${orderDate.getDate()}`;
    return {
      ...data,
      [dateString]: [...(data[dateString] || []), order],
    };
  }, {} as { [key: string]: Order[] });
};

export default function Orders() {
  const [status, setStatus] = useState<Status>(STATUS.IN_PROGRESS);

  return (
    <Fragment>
      <header className="pa-4">
        <StatusTabs status={status} setStatus={setStatus} />
      </header>
      <section className="h-[calc(100dvh-188px)] overflow-y-scroll px-4 pb-4">
        <OrderCardsWithDate data={getMockData(status)} />
      </section>
    </Fragment>
  );
}
