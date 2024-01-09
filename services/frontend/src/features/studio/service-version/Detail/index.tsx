import { useParams } from 'react-router-dom';
import { Fragment } from 'react';
import ServiceInfo from './components/ServiceInfo';
import OrderLinks from './components/OrderLinks';
import Actions from './components/Actions';

const orders = [
  {
    name: '阿狗',
    id: 1,
  },
  {
    name: '阿貓',
    id: 2,
  },
];

export default function Detail() {
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
