import type { Order } from '~frontend/features/studio/types';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getServiceColorById } from '~frontend/shared/utils/get-service-color-by-id';
import { getPeriodTime } from '~frontend/utils/time';
import { isEndOrder } from '~frontend/features/studio/utils';
import {
  getHeightByDuration,
  getTopByTimeAndOpenTime,
} from '~frontend/features/studio/components/CalendarWeekList/utils';
import { FULL_BLOCK_CLASS_NAMES } from '~frontend/features/studio/components/CalendarWeekList/constants';
import { STUDIO_TIMES } from '~frontend/shared/mock';
import { getSizeByDuration } from './utils';

type Props = {
  loose?: boolean;
  orders?: Order[];
};

export default function OrderTimeBlocks({ loose = true, orders }: Props) {
  if (!orders?.length) return null;

  return (
    <Fragment>
      {orders.map(
        ({
          startAt,
          id,
          service: { duration, name, currentAttendee, attendee, id: serviceId },
        }) => {
          const size = getSizeByDuration(duration);
          const { BORDER, BG } = getServiceColorById(serviceId);
          return (
            <li
              className={`${FULL_BLOCK_CLASS_NAMES} pr-2`}
              key={`order-cards-${id}-${serviceId}-${name}-${startAt}`}
              style={{
                height: `${getHeightByDuration(duration, loose)}px`,
                top: getTopByTimeAndOpenTime(startAt, STUDIO_TIMES[0], loose),
              }}
            >
              <Link
                to={`/studio/s/${serviceId}/${startAt}`}
                className={`${BG.ACTIVE} hover:bg-zinc-50 relative flex flex-col gap--1 pl-2 border-l-8 border-l-solid h-100% ${BORDER.LEFT}`}
              >
                <time className={size.TITLE}>
                  {getPeriodTime(startAt, duration)}
                </time>
                <span
                  className={`absolute right-0 flex items-center rounded-2 bg-primary-200 px-1 text-1em color-primary-500 ${size.TAG}`}
                >
                  {currentAttendee}/{attendee}
                </span>
                <h5
                  className={`line-clamp-2 font-normal ${
                    isEndOrder(startAt) ? 'color-zinc-500' : ''
                  } ${size.DESCRIPTION}`}
                >
                  {name}
                </h5>
              </Link>
            </li>
          );
        }
      )}
    </Fragment>
  );
}
