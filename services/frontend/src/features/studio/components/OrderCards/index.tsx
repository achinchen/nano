import type { Order } from '~frontend/features/studio/types';
import { Link } from 'react-router-dom';
import AttendeeTag from '~frontend/features/studio/components/AttendeeTag';
import { getServiceColorById } from '~frontend/shared/utils/get-service-color-by-id';
import { getPeriodTime } from '~frontend/utils/time';
import { isBefore } from '~frontend/utils/date';

type Props = {
  orders: Order[];
};

const version = '1-0-0';

const today = new Date('2024/01/01');

export default function OrderCards({ orders }: Props) {
  return (
    <section className="mt-2 flex flex-col gap-2">
      {orders.map(
        ({
          id,
          startAt,
          service: { duration, name, currentAttendee, attendee, id: serviceId },
        }) => (
          <Link
            to={`/studio/services/${serviceId}/${version}`}
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
