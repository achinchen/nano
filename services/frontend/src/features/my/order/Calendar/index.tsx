import { useEffect, useState } from 'react';
import CalendarMonthLoose from '~frontend/components/Calendar/Month/Loose/Process';
import { useAppContext } from '~frontend/context';
import { ORDER } from '~frontend/features/my/order/mock';

type Props = {
  className?: string;
};

const getMockData = (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const mockOrders =
    year === 2023 ? ORDER.end : [...ORDER.coming, ...ORDER.coming];

  return mockOrders
    .map(({ service, status, startAt }) => ({
      id: service.id,
      status: status === 'end' ? 'end' : 'start',
      startAt,
    }))
    .reduce((data, order) => {
      const { startAt, status } = order;
      const orderDate = new Date(startAt);
      const dateString = `${orderDate.getMonth() + 1}-${orderDate.getDate()}`;
      return {
        ...data,
        [dateString]: status,
      };
    }, {} as { [key: string]: string });
};

export default function Calendar({ className = '' }: Props) {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    setOrderData(getMockData(selectedDate));
  }, [selectedDate, setSelectedDate]);

  if (Object.values(orderData).length === 0) return null;

  return (
    <section className={`w-160 bg-zinc-50 h-full ${className}`}>
      <CalendarMonthLoose
        data={orderData}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </section>
  );
}
