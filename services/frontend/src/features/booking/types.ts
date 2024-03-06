import type { ServiceStatus } from '~frontend/types';

export type Service = {
  name: string;
  serviceId: number;
  description: string;
  location: {
    name: string;
    address: string;
  };
  time?: string;
  currentAttendee: number;
  queue: boolean;
  attendee: number;
  duration: number;
  allday: boolean;
  startAt: string;
  endAt: string;
  supplier: string;
  status: ServiceStatus;
};
