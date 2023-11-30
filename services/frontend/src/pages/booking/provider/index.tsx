import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookingContextProvider,
  useBookingContext,
} from '~frontend/features/booking/context';
import ServiceCards from '~frontend/features/booking/ServiceCards';
import {
  CalendarVerticalContextProvider,
  useCalendarVerticalContext,
} from '~frontend/features/booking/CalendarVertical/context';
import CalendarVertical from '~frontend/features/booking/CalendarVertical';
import CalendarHorizontal from '~frontend/features/booking/CalendarHorizontal';
import Header from '~frontend/features/booking/Header';
import { getIsMobile } from '~frontend/utils/device';

const provider = '阿狗狗的快樂小天地';

function Content() {
  const { mode } = useCalendarVerticalContext();
  const { setSelectedDate } = useBookingContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const date = searchParams.get('date');
    if (!date) return;
  }, [setSelectedDate, searchParams]);

  return getIsMobile() ? (
    <div className="flex flex-col">
      <CalendarVertical />
      <section
        className={`overflow-y-scroll flex-1 ${
          mode === 'week'
            ? 'max-h-[calc(100dvh-180px)]'
            : 'max-h-[calc(100dvh-384px)]'
        }`}
      >
        <ServiceCards />
      </section>
    </div>
  ) : (
    <div className="flex flex-row bg-white">
      <CalendarHorizontal />
      <section className="h-[calc(100dvh-156px)] flex-1 overflow-y-scroll">
        <ServiceCards />
      </section>
    </div>
  );
}

export default function Index() {
  return (
    <BookingContextProvider>
      <>
        <h1 className="mx-6 my-2 hidden text-4xl color-white md:block">
          {provider}
        </h1>
        <Header />
        <CalendarVerticalContextProvider>
          <Content />
        </CalendarVerticalContextProvider>
      </>
    </BookingContextProvider>
  );
}
