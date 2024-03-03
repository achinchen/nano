import { useParams } from 'react-router-dom';
import { Fragment, useMemo } from 'react';
import { SERVICES, ORDERS } from '~frontend/shared/mock';
import { isEndService } from '~frontend/features/studio/utils';
import ServiceInfo from './components/ServiceInfo';
import OrderLinks from './components/OrderLinks';
import Actions from './components/Actions';

export default function Detail() {
  const { id } = useParams<{ id?: string }>();
  const service = useMemo(
    () => SERVICES.find(({ serviceId }) => serviceId === Number(id)),
    [id]
  );

  if (!service) return null;

  const end = isEndService(service.startAt);
  const orders = ORDERS.filter(({ service }) => service.id === Number(id));

  return (
    <section className="mb-12">
      <ServiceInfo />
      <OrderLinks orders={orders} attendee={service.attendee} end={end} />
      {!end && (
        <Fragment>
          <div className="mx--4 mt-4 h-2 bg-zinc-200" />
          <Actions />
        </Fragment>
      )}
    </section>
  );
}
