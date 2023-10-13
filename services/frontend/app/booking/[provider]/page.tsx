import type { ServiceCardProps } from '~frontend/features/booking/ServiceCards/type';
import ServiceCards from '~frontend/features/booking/ServiceCards';
import CalendarVertical from '~frontend/features/booking/CalendarVertical';
import CalendarHorizontal from '~frontend/features/booking/CalendarHorizontal';

const services = [
  {
    id: 10,
    attendee: 3,
    duration: 240,
    name: '小飛象造型戚風蛋糕',
    time: '下午 2:00 - 下午 6:00',
    allday: false,
    address: '台中',
    supplier: '泡泡',
    status: 'has-order',
  },
  {
    id: 12,
    attendee: 1,
    duration: 60,
    name: '創業諮詢',
    allday: true,
    address: '台北',
    supplier: '阿狗狗',
    status: 'full',
  },
  {
    id: 13,
    attendee: 2,
    duration: 30,
    name: '美味寵物便當',
    allday: true,
    address: '台北',
    supplier: '阿狗狗',
    status: 'unsold',
  },
] as ServiceCardProps[];

// export default async function Index() {
//   return (
//     <>
//       <CalendarVertical />
//       <ServiceCards services={services} />
//     </>
//   );
// }

export default async function Index() {
  return (
    <>
      <CalendarHorizontal />
    </>
  );
}
