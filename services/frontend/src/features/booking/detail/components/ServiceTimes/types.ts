import type { Service } from '~frontend/features/booking/types';
import type { Dispatch, SetStateAction } from 'react';

export type Props = Pick<
  Service,
  'duration' | 'queue' | 'attendee' | 'startAt' | 'endAt' | 'allday'
> & {
  orders: {
    startAt: string;
    currentAttendee: number;
  }[];
  setDisabled: Dispatch<SetStateAction<boolean>>;
};
