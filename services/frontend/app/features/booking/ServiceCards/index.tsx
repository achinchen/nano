import type { ServiceCardProps } from './types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBookingContext } from '~frontend/features/booking/context';
import Icon from '~frontend/components/Icon';
import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import StatusTag from '~frontend/features/booking/components/StatusTag';
import sharedI from '~frontend/shared/i.json';
import { formatDuration } from '~frontend/utils/time';
import { ICON_COLOR } from '~frontend/features/booking/constants';
import scopedI from './i.json';

const SERVICES = [
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
    name: '創業諮詢創業諮詢創業諮詢創業諮詢創業諮詢創業諮詢創業諮詢創業諮詢創業諮詢創業諮詢創業諮詢',
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
  {
    id: 20,
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
    id: 22,
    attendee: 1,
    duration: 60,
    name: '創業諮詢',
    allday: true,
    address: '台北',
    supplier: '阿狗狗',
    status: 'full',
  },
  {
    id: 24,
    attendee: 2,
    duration: 30,
    name: '美味寵物便當',
    allday: true,
    address: '台北',
    supplier: '阿狗狗',
    status: 'unsold',
  },
  {
    id: 40,
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
    id: 42,
    attendee: 1,
    duration: 60,
    name: '創業諮詢',
    allday: true,
    address: '台北',
    supplier: '阿狗狗',
    status: 'full',
  },
  {
    id: 44,
    attendee: 2,
    duration: 30,
    name: '美味寵物便當',
    allday: true,
    address: '台北',
    supplier: '阿狗狗',
    status: 'unsold',
  },
] as ServiceCardProps[];

export function ServiceCard({
  id,
  attendee,
  duration: propDuration,
  name,
  allday,
  time = '',
  address,
  supplier,
  status,
}: ServiceCardProps) {
  const { provider } = useParams();
  const duration = formatDuration(propDuration);

  return (
    <Link
      href={`/booking/${provider}/s/${id}`}
      className="mb-2 flex flex-col gap-2 border-px border-zinc-200 rounded-4 border-solid pa-2 active:bg-zinc-200 hover:bg-zinc-50"
    >
      <div className="inline-flex justify-between">
        <span className="line-clamp-2 text-base font-bold">{name}</span>
        <StatusTag status={status} />
      </div>
      <div className="flex items-center gap-1 text-sm">
        <Icon size="2xl" icon="i-solar-chair-linear" className={ICON_COLOR} />
        <span>
          {attendee}
          {sharedI.unit.attendee}
        </span>
        <Icon
          size="2xl"
          icon="i-solar-alarm-linear"
          className={`ml-3 ${ICON_COLOR}`}
        />
        {duration} ·{' '}
        <span className="color-zinc-500">{allday ? scopedI.allday : time}</span>
      </div>
      <div className="flex flex-row gap-2">
        <span className={`${TAG_CONFIG.sm} bg-primary-100 color-primary-600`}>
          {address}
        </span>
        <span className={`${TAG_CONFIG.sm} bg-primary-100 color-primary-600`}>
          {supplier}
        </span>
      </div>
    </Link>
  );
}

export function ServiceCards() {
  const { selectedDate } = useBookingContext();
  const [services, setServices] = useState<ServiceCardProps[]>([]);

  useEffect(() => {
    const today = selectedDate.getDate() === new Date().getDate();
    setServices(today ? SERVICES : []);
  }, [selectedDate, setServices]);

  return (
    <section className="ma-4">
      {services.length ? (
        services.map((service) => <ServiceCard {...service} key={service.id} />)
      ) : (
        <div className="flex flex-col items-center color-zinc-500">
          <Icon
            size="5xl"
            className="mb-2 mt-20"
            icon="i-solar-moon-sleep-outline"
          />
          <span className="font-normal">{scopedI.placeholder}</span>
        </div>
      )}
    </section>
  );
}

export default ServiceCards;
