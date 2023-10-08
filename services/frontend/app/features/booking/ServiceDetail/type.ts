import type { Service } from '~frontend/features/booking/type';

export type ServiceDetailProps = Service & {
  selectedDate: Date;
};
