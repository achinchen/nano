import { useEffect, useState } from 'react';
import CalendarMonthLooseNameTag from '~frontend/components/Calendar/Month/Loose/NameTag';
import { useAppContext } from '~frontend/context';
import { ORDER } from '~frontend/shared/mock';

const getMockData = (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const mockOrders = year === 2023 ? ORDER.END : ORDER.IN_PROGRESS;

  return mockOrders
    .map(({ service, startAt }) => ({
      name: service.name,
      id: service.id,
      startAt,
    }))
    .reduce((data, order) => {
      const orderDate = new Date(order.startAt);
      const dateString = `${orderDate.getMonth() + 1}-${orderDate.getDate()}`;
      return {
        ...data,
        [dateString]: [...(data[dateString] || []), order],
      };
    }, {} as { [key: string]: unknown[] });
};

export default function CalendarMonthOrder() {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    setOrderData(getMockData(selectedDate));
  }, [selectedDate, setSelectedDate]);

  if (Object.values(orderData).length === 0) return null;

  return (
    <section className="h-full w-160 bg-zinc-50">
      <CalendarMonthLooseNameTag
        data={orderData}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </section>
  );
}
