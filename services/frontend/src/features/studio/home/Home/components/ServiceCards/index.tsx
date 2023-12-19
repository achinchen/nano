import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from '~frontend/components/Icon';
import { formatDuration, getPeriodTime } from '~frontend/utils/time';
import sharedI from '~frontend/shared/i.json';
import { getServiceColorById } from '~frontend/shared/get-service-color-by-id';

const SERVICES = [
  {
    duration: 90,
    name: '創業諮詢',
    currentAttendee: 4,
    allday: false,
    serviceId: 7,
    startAt: '2023-12-19T10:00',
  },
  {
    duration: 90,
    name: '客製蛋糕',
    currentAttendee: 1,
    serviceId: 21,
    allday: true,
    startAt: '2023-12-19T13:00',
  },
  {
    duration: 120,
    currentAttendee: 2,
    serviceId: 20,
    allday: true,
    address: '台北',
    name: '小飛象戚風蛋糕',
    startAt: '2023-12-19T15:00',
  },
  {
    duration: 90,
    name: '創業諮詢',
    currentAttendee: 4,
    allday: false,
    serviceId: 7,
    startAt: '2023-12-21T10:00',
  },
  {
    duration: 90,
    name: '客製蛋糕',
    currentAttendee: 1,
    serviceId: 21,
    allday: true,
    startAt: '2023-12-28T13:00',
  },
  {
    duration: 120,
    currentAttendee: 2,
    serviceId: 20,
    allday: true,
    address: '台北',
    name: '小飛象戚風蛋糕',
    startAt: '2023-12-31T15:00',
  },
  {
    duration: 90,
    name: '創業諮詢',
    currentAttendee: 4,
    allday: false,
    serviceId: 7,
    startAt: '2024-01-21T10:00',
  },
  {
    duration: 90,
    name: '客製蛋糕',
    currentAttendee: 1,
    serviceId: 21,
    allday: true,
    startAt: '2024-01-28T13:00',
  },
  {
    duration: 120,
    currentAttendee: 2,
    serviceId: 20,
    allday: true,
    address: '台北',
    name: '小飛象戚風蛋糕',
    startAt: '2024-01-31T15:00',
  },
];

export default function ServiceSimpleCards() {
  const [services] = useState(SERVICES);

  return (
    <section className="mt-2 flex flex-col gap-2">
      {services.map(
        ({ startAt, duration, name, currentAttendee, serviceId, allday }) => {
          const COLOR_SET = getServiceColorById(serviceId);
          const formattedDuration = formatDuration(duration);
          const time = allday
            ? sharedI.allday
            : getPeriodTime(startAt, duration);

          const needWrap = `${formattedDuration}${time}`.length > 20;
          return (
            <Link
              to={`/studio/services/${serviceId}?date=${startAt}`}
              className="flex flex-col overflow-hidden border-1 border-zinc-200 rounded-2 border-solid bg-light-100 pr-2 active:bg-zinc-100 hover:bg-zinc-50"
              key={`service-cards-${serviceId}-${name}-${startAt}`}
            >
              <div
                className={`py-2 pl-2 border-l-8 border-l-solid ${COLOR_SET.BORDER.LEFT}`}
              >
                <h5 className="line-clamp-2 text-base">{name}</h5>
                <span className={`flex items-start text-sm ${COLOR_SET.TEXT}`}>
                  <span className="flex items-center">
                    <Icon
                      size="2xl"
                      icon="i-solar-chair-linear"
                      className="flex-shrink-0"
                    />
                    <span className="ml-1 flex-shrink-0 color-zinc-700">
                      {currentAttendee}
                      {sharedI.unit.attendee}
                    </span>
                  </span>
                  <Icon
                    size="2xl"
                    icon="i-solar-alarm-linear"
                    className="ml-3 mr-1 flex-shrink-0"
                  />
                  <span className="whitespace-pre">
                    <span className="mx-1 color-zinc-700">
                      {formattedDuration} {''}· {needWrap && '\n'}
                    </span>
                    <span className="color-zinc-500">{time}</span>
                  </span>
                </span>
              </div>
            </Link>
          );
        }
      )}
    </section>
  );
}
