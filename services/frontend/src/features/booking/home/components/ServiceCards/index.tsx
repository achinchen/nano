import type { Service } from '~frontend/features/booking/types';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Icon from '~frontend/components/Icon';
import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import StatusTag from '~frontend/features/booking/components/StatusTag';
import sharedI from '~frontend/shared/i.json';
import { formatDuration } from '~frontend/utils/time';
import { ICON_COLOR } from '~frontend/features/booking/constants';
import { useAppContext } from '~frontend/context';
import { getMockServiceData } from '~frontend/features/booking/utils';
import scopedI from './i.json';

export function ServiceCard({
  serviceId,
  attendee,
  duration: propDuration,
  name,
  allday,
  time = '',
  location: { address },
  supplier,
  status,
}: Service) {
  const { provider } = useParams();
  const duration = formatDuration(propDuration);

  return (
    <Link
      to={`/booking/${provider}/s/${serviceId}`}
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
        <span className="color-zinc-500">{allday ? sharedI.allday : time}</span>
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
  const { selectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState<Service[]>([]);

  useEffect(() => {
    setServiceData(getMockServiceData(selectedDate));
  }, [selectedDate]);

  return (
    <section className="ma-4">
      {serviceData.length ? (
        serviceData.map((service) => (
          <ServiceCard {...service} key={service.serviceId} />
        ))
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
