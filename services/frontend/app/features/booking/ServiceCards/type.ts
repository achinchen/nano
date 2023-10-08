export type Status = 'unsold' | 'has-order' | 'full';

export type ServiceCardProps = {
  name: string;
  id: number;
  time?: string;
  attendee: number;
  duration: number;
  allday: boolean;
  location: string;
  supplier: string;
  status: Status;
};
