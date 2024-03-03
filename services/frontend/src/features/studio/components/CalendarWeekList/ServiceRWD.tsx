import type { Status } from './types';
import type { ServiceDetail, Order } from '~frontend/features/studio/types';
import { useState, useEffect, useMemo, lazy } from 'react';
import CalendarWeek from '~frontend/components/Calendar/Week';
import { SERVICE, ORDER, STUDIO_TIMES } from '~frontend/shared/mock';
import { useAppContext } from '~frontend/context';
import ServiceTimeBlock from './components/ServiceBlocks';
import OrderTimeBlocks from './components/OrderBlocks';
import TakeleaveBlocks from './components/TakeleaveBlocks';
import ServiceNav from './components/ServiceNav';
import { getTimeOptions, getStatusByAttendee } from './utils';

const ScrollableCalendarWeek = lazy(
  () => import('./components/ScrollableCalendarWeek')
);

const getMockServiceData = (selectedDate: Date) => {
  const selectedMonth = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const getDays = new Date(year, selectedMonth, 0).getDate();
  const mockServices = year === 2023 ? SERVICE.END : SERVICE.IN_PROGRESS;

  const services = mockServices.map(
    ({
      currentAttendee,
      attendee,
      startAt,
      name,
      serviceId,
      allday,
      endAt,
    }) => ({
      name,
      id: serviceId,
      status: getStatusByAttendee(attendee, currentAttendee),
      startAt,
      allday,
      endAt,
    })
  );
  return new Array(getDays).fill(0).reduce(
    (data, _, index) => ({
      ...data,
      [index + 1]: services,
    }),
    {}
  );
};

const getMockOrderData = (selectedDate: Date) => {
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
        [dateString]: [...(data[dateString] || []), order],
      };
    }, {} as { [key: string]: Order[] });
};

const TIME = 'w-14 md:w-17 text-xs color-zinc-500 font-normal text-right';

export default function ServiceCalendarListModeWithRWD({
  loose = true,
}: {
  loose?: boolean;
}) {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState({});
  const [orderData, setOrderData] = useState<{ [key: string]: Order[] }>({});
  const timeOptions = getTimeOptions(STUDIO_TIMES[0], STUDIO_TIMES[1]);

  const selectedDateOrders = useMemo(() => {
    const dateString = `${
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;
    return orderData[dateString];
  }, [orderData, selectedDate]);

  const serviceStatusData = useMemo(() => {
    return Object.entries(serviceData).reduce(
      (data, [date, services]) => ({
        ...data,
        [date]: (services as { status: Status }[])[0].status,
      }),
      {}
    );
  }, [serviceData]);

  useEffect(() => {
    setServiceData(getMockServiceData(selectedDate));
    setOrderData(getMockOrderData(selectedDate));
  }, [selectedDate, setSelectedDate]);

  return (
    <section className="border-t-1 border-t-zinc-200 border-t-solid pt-2 md:w-160 md:border-none md:bg-zinc-50 md:pt-0">
      {loose ? (
        <CalendarWeek
          onSelect={setSelectedDate}
          selectedDate={selectedDate}
          data={serviceStatusData}
          loose={loose}
        />
      ) : (
        <ScrollableCalendarWeek data={serviceStatusData} />
      )}
      <section className="mt-2 bg-zinc-50 md:mt-0">
        <ServiceNav />
        <main className="'h-[calc(100dvh-264px)] relative mt-2 overflow-y-scroll">
          <ul className="flex flex-col">
            {timeOptions.map((time) => (
              <li key={time} className="h-12 flex gap-1px md:h-15">
                <span className={`${TIME} flex flex-shrink-0 justify-end`}>
                  {time}
                </span>
                <span className="ml-1 w-100% translate-y-8px border-t-1 border-t-zinc-400 border-t-solid before:relative before:left-0 before:top-50% before:block before:h-0.5px before:w-100% before:translate-y--50% before:bg-zinc-200 before:content-['']" />
              </li>
            ))}
          </ul>
          <ul className="absolute top-0 w-[calc(100%-60px)] flex translate-x-15 md:w-[calc(100%-72px)] md:translate-x-18">
            <ServiceTimeBlock
              loose={loose}
              services={
                Object.values(serviceData)[0] as Pick<
                  ServiceDetail,
                  'id' | 'startAt' | 'endAt' | 'allday'
                >[]
              }
            />
            <OrderTimeBlocks loose={loose} orders={selectedDateOrders} />
            <TakeleaveBlocks loose={loose} />
          </ul>
        </main>
      </section>
    </section>
  );
}
