import { Fragment } from 'react';
import { getServiceColorById } from '~frontend/shared/get-service-color-by-id';
import { getPeriodTime } from '~frontend/utils/time';
import {
  getHeightByDuration,
  getTopByTimeAndOpenTime,
} from '~frontend/features/studio/CalendarWeekList/utils';
import { FULL_BLOCK_CLASS_NAMES } from '~frontend/features/studio/CalendarWeekList/constants';
import { getSizeByDuration } from './utils';

const ORDERS = [
  {
    duration: 15,
    name: '創業諮詢',
    description: '創業諮詢的敘述就好似這樣',
    currentAttendee: 4,
    serviceId: 7,
    attendee: 4,
    startAt: '2023-12-19T10:00',
  },
  {
    duration: 90,
    name: '客製蛋糕',
    description: '客製蛋糕的敘述就好似這樣',
    currentAttendee: 1,
    serviceId: 21,
    attendee: 2,
    startAt: '2023-12-19T13:00',
  },
  {
    duration: 30,
    name: '客製蛋糕',
    description: '客製蛋糕的敘述就好似這樣',
    currentAttendee: 2,
    serviceId: 21,
    attendee: 2,
    startAt: '2023-12-19T12:00',
  },
  {
    duration: 45,
    currentAttendee: 2,
    serviceId: 20,
    attendee: 2,
    description: '小飛象戚風蛋糕的敘述就好似這樣',
    name: '小飛象戚風蛋糕',
    startAt: '2023-12-19T15:00',
  },
];

const studioOpeningHours = ['09:00', '21:00'];

export default function OrderTimeBlocks({ loose = true }: { loose?: boolean }) {
  return (
    <Fragment>
      {ORDERS.map(
        ({ startAt, duration, name, currentAttendee, attendee, serviceId }) => {
          const size = getSizeByDuration(duration);
          const { BORDER, BG } = getServiceColorById(serviceId);
          return (
            <li
              className={`${FULL_BLOCK_CLASS_NAMES} ${BG.ACTIVE} pr-2 hover:bg-zinc-50`}
              key={`order-cards-${serviceId}-${name}-${startAt}`}
              style={{
                height: `${getHeightByDuration(duration, loose)}px`,
                top: getTopByTimeAndOpenTime(
                  startAt,
                  studioOpeningHours[0],
                  loose
                ),
              }}
            >
              <div
                className={`relative flex flex-col gap--1 pl-2 border-l-8 border-l-solid h-100% ${BORDER.LEFT}`}
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
                  className={`line-clamp-2 font-normal color-zinc-600 ${size.DESCRIPTION}`}
                >
                  {name}
                </h5>
              </div>
            </li>
          );
        }
      )}
    </Fragment>
  );
}
