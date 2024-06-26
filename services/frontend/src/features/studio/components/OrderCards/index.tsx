import { Link } from 'react-router-dom';
import { useState } from 'react';
import AttendeeTag from '~frontend/features/studio/components/AttendeeTag';
import { getServiceColorById } from '~frontend/shared/utils/get-service-color-by-id';
import { getPeriodTime } from '~frontend/utils/time';
import { isBefore } from '~frontend/utils/date';

const ORDERS = [
  {
    id: 1,
    duration: 90,
    name: '創業諮詢',
    currentAttendee: 4,
    serviceId: 7,
    attendee: 4,
    startAt: '2023-12-19T10:00',
  },
  {
    id: 20,
    duration: 90,
    name: '客製蛋糕',
    currentAttendee: 1,
    serviceId: 21,
    attendee: 2,
    startAt: '2023-12-19T13:00',
  },
  {
    id: 22,
    duration: 120,
    currentAttendee: 2,
    serviceId: 20,
    attendee: 2,
    address: '台北',
    name: '小飛象戚風蛋糕',
    startAt: '2023-12-19T15:00',
  },
];

const today = new Date();

export default function OrderCards() {
  const [orders] = useState(ORDERS);

  return (
    <section className="mt-2 flex flex-col gap-2">
      {orders.map(
        ({
          id,
          startAt,
          duration,
          name,
          currentAttendee,
          attendee,
          serviceId,
        }) => (
          <Link
            to={`/studio/orders/${id}`}
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
                <AttendeeTag
                  currentAttendee={currentAttendee}
                  attendee={attendee}
                />
              </span>
              <h5
                className={`line-clamp-2 text-sm font-normal ${
                  isBefore(new Date(startAt), today) ? 'color-zinc-500' : ''
                }`}
              >
                {name}
              </h5>
            </div>
          </Link>
        )
      )}
    </section>
  );
}
