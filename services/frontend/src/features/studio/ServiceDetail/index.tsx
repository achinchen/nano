import ServiceInfo from './ServiceInfo';
import OrderInfo from './OrderInfo';
import ServiceAction from './ServiceAction';

export function ServiceDetail() {
  return (
    <section className="mb-12">
      <ServiceInfo />
      <OrderInfo />
      <div className="mx--4 h-2 bg-zinc-200" />
      <ServiceAction />
    </section>
  );
}

export default ServiceDetail;
