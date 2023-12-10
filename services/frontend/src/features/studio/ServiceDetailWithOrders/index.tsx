import { useParams } from 'react-router-dom';
import { Fragment } from 'react';
import ServiceInfo from './components/ServiceInfo';
import OrderLinks from './components/OrderLinks';
import Actions from './components/Actions';

const orders = [
  {
    name: '阿狗',
    id: '1',
  },
  {
    name: '阿貓',
    id: '2',
  },
];

const service = {
  duration: 90,
  name: '創業諮詢',
  description:
    '這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。',
  currentAttendee: 1,
  queue: false,
  serviceId: 7,
  startAt: '2023-12-19T08:30',
  endAt: '2024-01-31T10:00',
  attendee: 4,
  supplier: '阿狗狗',
  location: {
    name: '台中',
    address: '407台中市西屯區臺灣大道三段251號',
  },
};

export default function ServiceDetailWithOrders() {
  const { id } = useParams<{ id?: string }>();
  const end = Number(id) % 2 === 0;

  return (
    <section className="mb-12">
      <ServiceInfo />
      <OrderLinks orders={orders} attendee={4} end={end} />
      {!end && (
        <Fragment>
          <div className="mx--4 mt-4 h-2 bg-zinc-200" />
          <Actions />
        </Fragment>
      )}
    </section>
  );
}
