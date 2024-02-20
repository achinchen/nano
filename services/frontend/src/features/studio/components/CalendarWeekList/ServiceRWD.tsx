import { useState, useEffect, useMemo, lazy } from 'react';
import CalendarWeek from '~frontend/components/Calendar/Week';
import { useStudioContext } from '~frontend/features/studio/context';
import { STUDIO_TIMES } from '~frontend/features/studio/mock';
import ServiceTimeBlock from './components/ServiceBlocks';
import OrderTimeBlocks from './components/OrderBlocks';
import TakeleaveBlocks from './components/TakeleaveBlocks';
import ServiceNav from './components/ServiceNav';
import { getTimeOptions } from './utils';

const ScrollableCalendarWeek = lazy(
  () => import('./components/ScrollableCalendarWeek')
);

const mockServiceData = {
  17: [{ name: '提拉米蘇蛋糕課', id: 1, status: 'full' }],
  20: [
    {
      name: '提拉米蘇蛋糕課',
      description: '提拉米蘇蛋糕課的敘述就好似這樣',
      id: 1,
      startTime: '10:00',
      endTime: '20:00',
      status: 'unsold',
    },
    {
      name: '情人節手作',
      id: 2,
      description: '情人節手作的敘述就好似這樣',
      startTime: '10:00',
      endTime: '12:00',
      status: 'has-order',
    },
    {
      name: '3天寫程式就上手不可能',
      description: '3天寫程式就上手不可能的敘述就好似這樣',
      id: 3,
      startTime: '09:00',
      endTime: '15:00',
      status: 'full',
    },
    {
      name: '精油課程妳看不見',
      id: 12,
      startTime: '10:00',
      endTime: '18:00',
      description: '精油課程妳看不見的敘述就好似這樣',
      status: 'has-order',
    },
    {
      name: '提拉米蘇蛋糕課',
      description: '提拉米蘇蛋糕課的敘述就好似這樣',
      startTime: '19:00',
      endTime: '21:00',
      id: 30,
      status: 'has-order',
    },
  ],
  30: [
    {
      name: '提拉米蘇蛋糕課',
      id: 30,
      status: 'has-order',
    },
  ],
};

const TIME = 'w-14 md:w-17 text-xs color-zinc-500 font-normal text-right';

const getMockData = (month: number) => {
  return Object.entries(mockServiceData).reduce((data, [date, value]) => {
    return {
      ...data,
      [`${month}-${date}`]: value,
    };
  }, {});
};

export default function ServiceCalendarListModeWithRWD({
  loose = true,
}: {
  loose?: boolean;
}) {
  const { selectedDate, setSelectedDate } = useStudioContext();
  const [serviceData, setServiceData] = useState({});
  const timeOptions = getTimeOptions(STUDIO_TIMES[0], STUDIO_TIMES[1]);

  const serviceStatusData = useMemo(() => {
    return Object.entries(serviceData).reduce(
      (data, [date, services]) => ({
        ...data,
        [date]: (services as { status: 'unsold' | 'full' | 'has-order' }[])[0]
          .status,
      }),
      {}
    );
  }, [serviceData]);

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const isThisMonth = selectedDate.getMonth() === thisMonth;
    setServiceData(isThisMonth ? getMockData(thisMonth + 1) : {});
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
          <ul className="absolute top-0 w-[calc(100%-60px)] translate-x-15 md:w-[calc(100%-72px)] md:translate-x-18">
            <ServiceTimeBlock loose={loose} />
            <OrderTimeBlocks loose={loose} />
            <TakeleaveBlocks loose={loose} />
          </ul>
        </main>
      </section>
    </section>
  );
}
