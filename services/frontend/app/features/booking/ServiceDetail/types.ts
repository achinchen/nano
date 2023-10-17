import type { Service } from '~frontend/features/booking/types';

export type ServiceDetailProps = Service & {
  selectedDate: Date;
};
