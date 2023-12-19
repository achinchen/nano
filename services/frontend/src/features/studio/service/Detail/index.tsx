import OrderFields from '~frontend/features/studio/components/OrderFields';
import ServiceInfo from './components/ServiceInfo';
import Actions from './components/Actions';

export default function Detail() {
  return (
    <section className="max-h-[calc(100dvh-52px)] overflow-y-scroll pa-4 md:max-h-[calc(100dvh-112px)]">
      {/* <section className="mb-12"> */}
      <ServiceInfo />
      <OrderFields queue />
      <div className="mx--4 h-2 bg-zinc-200" />
      <Actions />
    </section>
  );
}
