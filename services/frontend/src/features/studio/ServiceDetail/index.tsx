import OrderFields from '~frontend/features/studio/components/OrderFields';
import ServiceInfo from '~frontend/features/studio/components/ServiceInfo';
import Actions from './components/Actions';

const service = {
  duration: 90,
  name: '創業諮詢',
  description:
    '這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。',
  currentAttendee: 1,
  queue: false,
  serviceId: 7,
  startAt: '2023-12-19T08:30',
  endAt: '2024-01-31T10:00',
  attendee: 4,
  supplier: '阿狗狗',
  location: {
    name: '台中',
    address: '407台中市西屯區臺灣大道三段251號',
  },
};

export function ServiceDetail() {
  return (
    <section className="mb-12">
      <ServiceInfo {...service} title={service.name} />
      <OrderFields queue />
      <div className="mx--4 h-2 bg-zinc-200" />
      <Actions />
    </section>
  );
}

export default ServiceDetail;
