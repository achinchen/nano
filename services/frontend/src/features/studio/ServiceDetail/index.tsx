import OrderFields from '~frontend/features/studio/components/OrderFields';
import ServiceInfo from './ServiceInfo';
import ServiceAction from './ServiceAction';

export function ServiceDetail() {
  return (
    <section className="mb-12">
      <ServiceInfo />
      <OrderFields queue />
      <div className="mx--4 h-2 bg-zinc-200" />
      <ServiceAction />
    </section>
  );
}

export default ServiceDetail;
