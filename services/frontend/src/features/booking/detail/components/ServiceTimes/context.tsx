import type { Service } from '~frontend/features/booking/types';
import type { Dispatch, SetStateAction } from 'react';
import type { Props } from './types';
import { useMemo, createContext, useContext, useState } from 'react';
import {
  addMinutes,
  getPlainPeriodTimes,
  getDurationByStartAtAndEndAt,
  isBefore,
} from '~frontend/utils/time';
import { STUDIO_TIMES, STUDIO_DURATION } from '~frontend/shared/mock';
import { getStatusByAttendee } from '~frontend/shared/utils/get-status-by-attendee';

const TIME_BLOCK = 10;
const getTimeBlocks = ({
  startAt,
  endAt,
  allday,
}: Pick<Props, 'allday' | 'startAt' | 'endAt'>) => {
  const start = allday ? `2023-01-01T${STUDIO_TIMES[0]}:00Z` : startAt;
  const duration = allday
    ? STUDIO_DURATION
    : getDurationByStartAtAndEndAt(start, endAt);
  return Array.from({ length: duration / TIME_BLOCK }, (_, i) => {
    return addMinutes(start, i * TIME_BLOCK);
  });
};

type Times = {
  status: Service['status'];
  time: string;
  restAttendee: number;
}[];

type InitialState = {
  times: Times;
  queue: Props['queue'];
  queues: string[];
  setQueues: Dispatch<SetStateAction<string[]>>;
};

export const ServiceTimesContext = createContext<InitialState>({
  times: [],
  queue: true,
  queues: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setQueues: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  ServiceTimesContext.displayName = 'ServiceTimesContext';
}

export const ServiceTimesContextProvider = ({
  queue,
  orders: propOrder,
  startAt,
  endAt,
  allday,
  duration,
  attendee,
  children,
}: {
  children: JSX.Element;
  queue: InitialState['queue'];
  duration: Props['duration'];
  orders: Props['orders'];
  attendee: Props['attendee'];
  allday: Props['allday'];
  startAt: Props['startAt'];
  endAt: Props['endAt'];
}) => {
  const times = useMemo(() => {
    const orders = propOrder.map(({ startAt, currentAttendee }) => {
      const [startTime, endTime] = getPlainPeriodTimes(startAt, duration);
      return {
        startTime,
        endTime,
        currentAttendee: currentAttendee,
      };
    });

    return getTimeBlocks({ startAt, endAt, allday }).map((time) => {
      const currentAttendees =
        orders
          .filter(({ startTime, endTime }) => {
            return isBefore(startTime, time) && isBefore(time, endTime);
          })
          .reduce((acc, { currentAttendee = 1 }) => acc + currentAttendee, 0) ||
        0;
      return {
        status: getStatusByAttendee(attendee, currentAttendees),
        time,
        restAttendee: attendee - currentAttendees,
      };
    });
  }, [propOrder, duration, attendee, startAt, endAt, allday]);

  const [queues, setQueues] = useState<InitialState['queues']>([]);

  return (
    <ServiceTimesContext.Provider
      value={{
        times,
        queue,
        setQueues,
        queues,
      }}
    >
      {children}
    </ServiceTimesContext.Provider>
  );
};

export function useServiceTimesContext() {
  const context = useContext(ServiceTimesContext);
  if (context === undefined) {
    throw new Error(
      'The ServiceTimesContext hook must be used within a ServiceTimesContextProvider.Provider'
    );
  }
  return context;
}
