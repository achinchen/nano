import type { ServiceCardProps } from '~frontend/features/booking/ServiceCards/type';
import ServiceCards from '~frontend/features/booking/ServiceCards';
import VerticalCalendar from '~frontend/features/booking/VerticalCalendar';

const services = [
  {
    id: 10,
    attendee: 3,
    duration: 240,
    name: '小飛象造型戚風蛋糕',
    time: '下午 2:00 - 下午 6:00',
    allday: false,
    location: '台北',
    supplier: '泡泡',
    status: 'has-order',
  },
  {
    id: 12,
    attendee: 1,
    duration: 60,
    name: '創業諮詢',
    allday: true,
    location: '台中',
    supplier: '阿狗狗',
    status: 'full',
  },
] as ServiceCardProps[];

export default async function Index() {
  return (
    <>
      <VerticalCalendar />
      <ServiceCards services={services} />
    </>
  );
}
