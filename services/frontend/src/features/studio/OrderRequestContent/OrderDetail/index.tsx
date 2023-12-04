import ConsumerContactInfo from '~frontend/features/studio/components/ConsumerContactInfo';
import Separator from '~frontend/components/Separator';
import ServiceInfo from './components/ServiceInfo';
import ConsumerName from './components/ConsumerName';
import Requirement from './components/Requirement';

export default function RequestOrderDetail() {
  return (
    <section className="mb-12 mt-4">
      <ConsumerName />
      <Separator />
      <ServiceInfo />
      <Separator />
      <Requirement />
      <Separator />
      <ConsumerContactInfo />
    </section>
  );
}
