import type { Service } from '~frontend/features/booking/types';

export type Props = Pick<
  Service,
  'duration' | 'queue' | 'attendee' | 'startAt' | 'endAt' | 'allday'
> & {
  orders: {
    startAt: string;
    currentAttendee: number;
  }[];
};
