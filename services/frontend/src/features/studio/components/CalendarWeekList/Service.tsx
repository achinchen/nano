import type { ServiceStatus } from '~frontend/types';
import type { ServiceDetail } from '~frontend/features/studio/types';
import { useState, useEffect, useMemo } from 'react';
import CalendarWeek from '~frontend/components/Calendar/Week';
import { useAppContext } from '~frontend/context';
import { SERVICE, STUDIO_TIMES } from '~frontend/shared/mock';
import { getStatusByAttendee } from '~frontend/shared/utils/get-status-by-attendee';
import ServiceTimeBlock from './components/ServiceBlocks';
import TakeleaveBlocks from './components/TakeleaveBlocks';
import ServiceNav from './components/ServiceNav';
import { getTimeOptions } from './utils';

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

const TIME = 'w-14 md:w-17 text-xs color-zinc-500 font-normal text-right';

export default function ServiceCalendarListMode() {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState({});
  const timeOptions = getTimeOptions(STUDIO_TIMES[0], STUDIO_TIMES[1]);

  const serviceStatusData = useMemo(() => {
    return Object.entries(serviceData).reduce(
      (data, [date, services]) => ({
        ...data,
        [date]: (services as { status: ServiceStatus }[])[0].status,
      }),
      {}
    );
  }, [serviceData]);

  useEffect(() => {
    setServiceData(getMockServiceData(selectedDate));
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
        <ServiceNav />
        <main className="relative mt-2 h-[calc(100dvh-264px)] overflow-y-scroll">
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
          <ul className="absolute top-0 w-[calc(100%-72px)] flex translate-x-18">
            <ServiceTimeBlock
              loose
              services={
                Object.values(serviceData)[0] as Pick<
                  ServiceDetail,
                  'id' | 'startAt' | 'endAt' | 'allday'
                >[]
              }
            />
            <TakeleaveBlocks loose />
          </ul>
        </main>
      </section>
    </section>
  );
}
