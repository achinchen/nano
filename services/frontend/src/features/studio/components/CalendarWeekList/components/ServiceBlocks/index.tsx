import { Fragment } from 'react';
import { getServiceColorById } from '~frontend/shared/utils/get-service-color-by-id';
import {
  getHeightByDuration,
  getTopByTimeAndOpenTime,
} from '~frontend/features/studio/components/CalendarWeekList/utils';
import {
  SERVICE,
  STUDIO_TIMES,
  STUDIO_DURATION,
} from '~frontend/features/studio/mock';

const SERVICES = SERVICE.IN_PROGRESS.map(
  ({ serviceId, startAt, duration, allday }) => ({
    id: serviceId,
    startAt,
    duration: allday ? STUDIO_DURATION : duration,
  })
);

export default function ServiceTimeBlocks({
  loose = true,
}: {
  loose?: boolean;
}) {
  return (
    <Fragment>
      {SERVICES.map(({ id, startAt, duration }, index) => (
        <li
          className={`inline-block min-w-20 mt-9px max-w-60 rounded-2 mr-2 ${
            getServiceColorById(id).BG.LIGHT
          }`}
          // eslint-disable-next-line react/no-array-index-key
          key={`service-time-${id}-${startAt}-${index}`}
          style={{
            height: `${getHeightByDuration(duration, loose)}px`,
            translate: `translateY(${getTopByTimeAndOpenTime(
              startAt,
              STUDIO_TIMES[0],
              loose
            )})`,
          }}
        />
      ))}
    </Fragment>
  );
}
