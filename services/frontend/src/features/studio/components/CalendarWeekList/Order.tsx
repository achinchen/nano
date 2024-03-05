import type { Order } from '~frontend/features/studio/types';
import type { ServiceStatus } from '~frontend/types';
import { useState, useEffect, useMemo } from 'react';
import CalendarWeek from '~frontend/components/Calendar/Week';
import { useAppContext } from '~frontend/context';
import { STUDIO_TIMES, ORDER } from '~frontend/shared/mock';
import { getStatusByAttendee } from '~frontend/shared/utils/get-status-by-attendee';
import OrderTimeBlocks from './components/OrderBlocks';
import TakeleaveBlocks from './components/TakeleaveBlocks';
import { getTimeOptions } from './utils';

type Data = Order & { status: ServiceStatus };

const getMockData = (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const mockOrders = year === 2023 ? ORDER.END : ORDER.IN_PROGRESS;

  return mockOrders
    .map((order) => ({
      ...order,
      status: getStatusByAttendee(
        order.service.currentAttendee,
        order.service.attendee
      ),
    }))
    .reduce((data, order) => {
      const orderDate = new Date(order.startAt);
      const dateString = `${orderDate.getMonth() + 1}-${orderDate.getDate()}`;
      return {
        ...data,
        [dateString]: [...(data[dateString] || []), order] as Data[],
      };
    }, {} as { [key: string]: Data[] });
};

const TIME = 'w-14 md:w-17 text-xs color-zinc-500 font-normal text-right';

export default function OrderCalendarListMode() {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [orderData, setOrderData] = useState<{ [key: string]: Data[] }>({});
  const timeOptions = getTimeOptions(STUDIO_TIMES[0], STUDIO_TIMES[1]);

  const serviceStatusData = useMemo(() => {
    return Object.entries(orderData).reduce(
      (data, [date, services]) => ({
        ...data,
        [date]: (services as { status: ServiceStatus }[])[0].status,
      }),
      {}
    );
  }, [orderData]);

  const selectedDateOrders = useMemo(() => {
    const dateString = `${
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;
    return orderData[dateString];
  }, [orderData, selectedDate]);

  useEffect(() => {
    setOrderData(getMockData(selectedDate));
  }, [selectedDate, setSelectedDate]);

  return (
    <section className="w-160 bg-zinc-50">
      <CalendarWeek
        onSelect={setSelectedDate}
        selectedDate={selectedDate}
        data={serviceStatusData}
        loose
      />
      <section className="bg-zinc-50">
        <main className="relative mt-2 h-[calc(100dvh-220px)] overflow-y-scroll">
          <ul className="flex flex-col">
            {timeOptions.map((time) => (
              <li key={time} className="h-15 flex gap-1px">
                <span className={`${TIME} flex flex-shrink-0 justify-end`}>
                  {time}
                </span>
                <span className="ml-1 w-100% translate-y-8px border-t-1 border-t-zinc-400 border-t-solid before:relative before:left-0 before:top-50% before:block before:h-0.5px before:w-100% before:translate-y--50% before:bg-zinc-200 before:content-['']" />
              </li>
            ))}
          </ul>
          <ul className="absolute top-0 w-[calc(100%-72px)] flex translate-x-18">
            <OrderTimeBlocks loose orders={selectedDateOrders} />
            <TakeleaveBlocks loose />
          </ul>
        </main>
      </section>
    </section>
  );
}
