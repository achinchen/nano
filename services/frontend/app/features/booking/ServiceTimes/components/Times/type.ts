import type { Service } from '~frontend/features/booking/type';

type Time = string;

export type ServiceTime = {
  time: Time;
  status: Service['status'];
  restAttendee?: Service['attendee'];
};
