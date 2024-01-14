import { getPlainPeriodTimes } from '~frontend/utils/time';
import { setDateTime } from '~frontend/utils/date';

type Payload = {
  allday: boolean;
  startAt: string;
  endAt: string;
  startTime: string;
  endTime: string;
  studioOpenAt: Date;
  studioOpenDuration: number;
};

export const getStartAtAndEndAt = ({
  allday,
  startAt,
  endAt,
  startTime,
  endTime,
  studioOpenAt,
  studioOpenDuration,
}: Payload) => {
  if (!allday) {
    return {
      startAt: setDateTime(startAt, startTime),
      endAt: setDateTime(endAt, endTime),
    };
  }

  const [openTime, closeTime] = getPlainPeriodTimes(
    studioOpenAt,
    studioOpenDuration
  );

  return {
    startAt: setDateTime(startAt, openTime),
    endAt: setDateTime(endAt, closeTime),
  };
};
