'use client';

import { BookingContextProvider } from '~frontend/features/booking/context';
import ServiceCards from '~frontend/features/booking/ServiceCards';
import {
  CalendarVerticalContextProvider,
  useCalendarVerticalContext,
} from '~frontend/features/booking/CalendarVertical/context';
import CalendarVertical from '~frontend/features/booking/CalendarVertical';
import CalendarHorizontal from '~frontend/features/booking/CalendarHorizontal';
import Header from '~frontend/features/booking/Header';

const provider = '阿狗狗的快樂小天地';

function Content() {
  const { mode } = useCalendarVerticalContext();

  return (
    <div className="flex flex-col bg-white md:flex-row">
      <CalendarHorizontal className="hidden md:block" />
      <CalendarVertical className="md:hidden" />
      <section
        className={`overflow-y-scroll md:h-[calc(100vh-156px)] flex-1 ${
          mode === 'week' ? 'h-[calc(100vh-160px)]' : 'h-[calc(100vh-364px)]'
        }`}
      >
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
