import type { Status } from '~frontend/features/booking/components/StatusTag/type';

export type Service = {
  name: string;
  id: number;
  description: string;
  location: {
    name: string;
    address: string;
  };
  time?: string;
  attendee: number;
  duration: number;
  allday: boolean;
  supplier: string;
  status: Status;
};
