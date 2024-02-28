import type { ServiceDetail } from '~frontend/features/studio/types';
import { Fragment, useMemo } from 'react';
import { getServiceColorById } from '~frontend/shared/utils/get-service-color-by-id';
import { getDurationByStartAtAndEndAt } from '~frontend/utils/time';
import {
  PADDING_TOP,
  getHeightByDuration,
  getTopByTimeAndOpenTime,
} from '~frontend/features/studio/components/CalendarWeekList/utils';
import { STUDIO_TIMES, STUDIO_DURATION } from '~frontend/shared/mock';

type Props = {
  loose?: boolean;
  services: Pick<ServiceDetail, 'id' | 'startAt' | 'endAt' | 'allday'>[];
};

export default function ServiceTimeBlocks({
  loose = true,
  services: propServices,
}: Props) {
  const services = useMemo(
    () =>
      propServices?.map(({ id, startAt, endAt, allday }) => ({
        id,
        startAt,
        duration: allday
          ? STUDIO_DURATION
          : getDurationByStartAtAndEndAt(startAt, endAt),
      })),
    [propServices]
  );

  if (!propServices?.length) return null;

  return (
    <Fragment>
      {services.map(({ id, startAt, duration }, index) => (
        <li
          className={`relative inline-block mt--50px min-w-20 max-w-60 rounded-2 mr-2 ${
            getServiceColorById(id).BG.LIGHT
          }`}
          // eslint-disable-next-line react/no-array-index-key
          key={`service-time-${id}-${startAt}-${index}`}
          style={{
            height: `${getHeightByDuration(duration, loose)}px`,
            top: `${
              getTopByTimeAndOpenTime(startAt, STUDIO_TIMES[0], loose) +
              (STUDIO_DURATION === duration ? 0 : PADDING_TOP)
            }px`,
          }}
        >
          {/* {getTopByTimeAndOpenTime(startAt, STUDIO_TIMES[0], loose)} */}
        </li>
      ))}
    </Fragment>
  );
}
