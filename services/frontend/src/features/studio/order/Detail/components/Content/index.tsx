import { useParams } from 'react-router-dom';
import { Fragment, useMemo } from 'react';
import { ORDERS } from '~frontend/shared/mock';
import { isEndOrder } from '~frontend/features/studio/utils';
import Info from './components/Info';
import ServiceAction from './components/Actions';

export default function Content() {
  const { id } = useParams<{ id?: string }>();
  const order = useMemo(
    () => ORDERS.find(({ id: orderId }) => orderId === Number(id)),
    [id]
  );

  if (!order) return null;

  return (
    <section className="mb-12 mt-4">
      <Info {...order} />
      {!isEndOrder(order.startAt) && (
        <Fragment>
          <div className="mx--4 h-2 bg-zinc-200" />
          <ServiceAction />
        </Fragment>
      )}
    </section>
  );
}
