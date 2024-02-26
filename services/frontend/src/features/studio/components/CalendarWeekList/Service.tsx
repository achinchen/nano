import { useState, useEffect, useMemo } from 'react';
import CalendarWeek from '~frontend/components/Calendar/Week';
import { useAppContext } from '~frontend/context';
import { SERVICE } from '~frontend/shared/mock';
import ServiceTimeBlock from './components/ServiceBlocks';
import TakeleaveBlocks from './components/TakeleaveBlocks';
import ServiceNav from './components/ServiceNav';
import { getTimeOptions } from './utils';

const services = SERVICE.IN_PROGRESS.map(
  ({ currentAttendee, attendee, name, serviceId }) => ({
    name,
    id: serviceId,
    status:
      currentAttendee >= attendee
        ? 'full'
        : currentAttendee
        ? 'has-order'
        : 'unsold',
  })
);

const getMockServiceData = (month: number) => {
  const getDays = new Date(2024, month - 1, 0).getDate();

  return new Array(getDays).fill(0).reduce(
    (data, _, index) => ({
      ...data,
      [index + 1]: services,
    }),
    {}
  );
};

const TIME = 'w-14 md:w-17 text-xs color-zinc-500 font-normal text-right';
const studioOpeningHours = ['09:00', '20:30'];

export default function ServiceCalendarListMode() {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [serviceData, setServiceData] = useState({});
  const timeOptions = getTimeOptions(
    studioOpeningHours[0],
    studioOpeningHours[1]
  );

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
    setServiceData(getMockServiceData(thisMonth + 1));
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
          <ul className="absolute top-0 w-[calc(100%-72px)] translate-x-18">
            <ServiceTimeBlock loose />
            <TakeleaveBlocks loose />
          </ul>
        </main>
      </section>
    </section>
  );
}
