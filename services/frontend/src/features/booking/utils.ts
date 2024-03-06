import type { Service } from '~frontend/features/booking/types';
import { SERVICE, ORDER, TAKE_LEAVES } from '~frontend/shared/mock';
import { isSameDay } from '~frontend/utils/date';
import { getStatusByAttendee } from '~frontend/shared/utils/get-status-by-attendee';

export const getOrders = (
  serviceId: Service['serviceId'],
  selectedDate: Date
) => {
  const year = selectedDate.getFullYear();
  const orders = year === 2023 ? ORDER.END : ORDER.IN_PROGRESS;
  return [...orders].filter(
    (order) =>
      order.service.id === serviceId &&
      isSameDay(new Date(order.startAt), selectedDate)
  );
};

const getCurrentAttendeeAndStatus = (
  service: Omit<Service, 'status'>,
  selectedDate: Date
) => {
  const currentAttendee =
    getOrders(service.serviceId, selectedDate).length || 0;

  const status = getStatusByAttendee(service.attendee, currentAttendee);

  return {
    currentAttendee,
    status,
  };
};

export const getServiceWithStatus = (service: Service, selectedDate: Date) => {
  const { currentAttendee, status } = getCurrentAttendeeAndStatus(
    service,
    selectedDate
  );

  return {
    ...service,
    currentAttendee,
    status,
  } as unknown as Service;
};

export const getMockServiceData = (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const services = year === 2023 ? SERVICE.END : SERVICE.IN_PROGRESS;
  const isDayOff = isSameDay(new Date(TAKE_LEAVES[0].startAt), selectedDate);

  if (isDayOff) return [];

  return services.map((service) => {
    const { currentAttendee, status } = getCurrentAttendeeAndStatus(
      service,
      selectedDate
    );

    return {
      ...service,
      currentAttendee,
      status,
    };
  });
};
