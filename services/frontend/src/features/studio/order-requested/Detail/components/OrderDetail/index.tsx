import ConsumerContactInfo from '~frontend/shared/components/ConsumerContactInfo';
import Separator from '~frontend/components/Separator';
import sharedI from '~frontend/shared/i.json';
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
      <h3 className="mb-2 text-base">{sharedI.info.title}</h3>
      <ConsumerContactInfo />
    </section>
  );
}
