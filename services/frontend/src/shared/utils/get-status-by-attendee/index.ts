import type { ServiceStatus } from '~frontend/types';

export const getStatusByAttendee = (
  attendee: number,
  currentAttendee: number
): ServiceStatus => {
  return currentAttendee >= attendee
    ? 'full'
    : currentAttendee
    ? 'has-order'
    : 'unsold';
};
