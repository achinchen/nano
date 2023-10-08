'use client';

import type { ServiceCardProps } from './type';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Icon from '~frontend/components/Icon';
import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import StatusTag from '~frontend/features/booking/components/StatusTag';
import featureI from '~frontend/features/booking/i.json';
import { formatDuration } from '~frontend/features/booking/utils';
import { ICON_COLOR } from '~frontend/features/booking/constants';
import scopedI from './i.json';

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
      className="flex flex-col gap-2 border-px border-zinc-200 rounded-4 border-solid pa-2"
    >
      <div className="inline-flex justify-between">
        <span className="text-base font-bold">{name}</span>
        <StatusTag status={status} />
      </div>
      <div className="flex items-center gap-1">
        <Icon size="2xl" icon="i-solar-chair-linear" className={ICON_COLOR} />
        <span>
          {attendee}
          {featureI.unit.attendee}
        </span>
        <Icon
          size="2xl"
          icon="i-solar-alarm-linear"
          className={`ml-3 ${ICON_COLOR}`}
        />
        {duration} ·{' '}
        <span className="color-zinc-600">{allday ? scopedI.allday : time}</span>
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

export function ServiceCards({ services }: { services: ServiceCardProps[] }) {
  return (
    <section className="ma-4 flex flex-col gap-2">
      {services.map((service) => (
        <ServiceCard {...service} key={service.id} />
      ))}
    </section>
  );
}

export default ServiceCards;
