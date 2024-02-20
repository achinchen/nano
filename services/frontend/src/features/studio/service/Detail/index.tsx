import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import OrderFields from '~frontend/features/studio/components/OrderFields';
import ServiceInfo from '~frontend/features/studio/components/ServiceInfo';
import { SERVICES } from '~frontend/features/studio/mock';
import { isEndService } from '~frontend/features/studio/utils';
import Actions from './components/Actions';

export default function Detail() {
  const { id } = useParams<{ id?: string }>();
  const service = useMemo(
    () => SERVICES.find(({ serviceId }) => serviceId === Number(id)),
    [id]
  );

  if (!service) return null;
  return (
    <section className="max-h-[calc(100dvh-52px)] overflow-y-scroll pa-4 md:max-h-[calc(100dvh-112px)]">
      <ServiceInfo {...service} id={Number(id || 1)} />
      <OrderFields queue={service.queue} />
      <div className="mx--4 h-2 bg-zinc-200" />
      <Actions end={isEndService(service.endAt)} id={service.serviceId} />
    </section>
  );
}
