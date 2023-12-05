import { formatDuration } from '~frontend/utils/time';
import { useRequestOrderContext } from '~frontend/features/studio/OrderRequestContent/context';
import ServiceDetail from './ServiceDetail';

export default function ServiceInfo() {
  const { service } = useRequestOrderContext();

  return (
    <section className="text-sm font-normal">
      <header className="my-0 flex items-center justify-between">
        <h2 className="line-clamp-3 text-lg font-bold">{service.name}</h2>
        <ServiceDetail />
      </header>
      <p className="line-clamp-3 my-1 color-zinc-600 lt-sm:hidden">
        {service.description}
      </p>
      <footer>
        {service.location.name} | {service.supplier} |{' '}
        {formatDuration(service.duration)}
      </footer>
    </section>
  );
}
