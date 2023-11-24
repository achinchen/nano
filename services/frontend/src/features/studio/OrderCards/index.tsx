import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import { getServiceColorById } from '~frontend/shared/get-service-color-by-id';
import { getPeriodTime } from '~frontend/utils/time';

const ORDERS = [
  {
    duration: 90,
    name: '創業諮詢',
    currentAttendee: 4,
    serviceId: 7,
    attendee: 4,
    startAt: '2023-12-19T10:00',
  },
  {
    duration: 90,
    name: '客製蛋糕',
    currentAttendee: 1,
    serviceId: 21,
    attendee: 2,
    startAt: '2023-12-19T13:00',
  },
  {
    duration: 120,
    currentAttendee: 2,
    serviceId: 20,
    attendee: 2,
    address: '台北',
    name: '小飛象戚風蛋糕',
    startAt: '2023-12-19T15:00',
  },
];

export default function OrderCards() {
  const [orders] = useState(ORDERS);

  return (
    <section className="mt-2 flex flex-col gap-2">
      {orders.map(
        ({ startAt, duration, name, currentAttendee, attendee, serviceId }) => (
          <Link
            to="/studio/orders/"
            className="flex flex-col overflow-hidden border-1 border-zinc-200 rounded-2 border-solid bg-light-100 pr-2 active:bg-zinc-100 hover:bg-zinc-50"
            key={`order-cards-${serviceId}-${name}-${startAt}`}
          >
            <div
              className={`py-2 pl-2 border-l-8 border-l-solid ${
                getServiceColorById(serviceId).BORDER.LEFT
              }`}
            >
              <span className="flex justify-between gap-1">
                <time>{getPeriodTime(startAt, duration)}</time>
                <span
                  className={`${TAG_CONFIG.sm} flex items-center bg-primary-200 color-primary-500`}
                >
                  {currentAttendee} / {attendee}
                </span>
              </span>
              <h5 className="line-clamp-2 text-sm font-normal color-zinc-600">
                {name}
              </h5>
            </div>
          </Link>
        )
      )}
    </section>
  );
}
