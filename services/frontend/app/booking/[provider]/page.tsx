'use client';

import { BookingContextProvider } from '~frontend/features/booking/context';
import ServiceCards from '~frontend/features/booking/ServiceCards';
import CalendarVertical from '~frontend/features/booking/CalendarVertical';
import CalendarHorizontal from '~frontend/features/booking/CalendarHorizontal';
import Header from '~frontend/features/booking/Header';

const provider = '阿狗狗的快樂小天地';

export default function Index() {
  return (
    <BookingContextProvider>
      <>
        <h1 className="mx-6 my-2 hidden text-4xl color-white md:block">
          {provider}
        </h1>
        <Header />
        <div className="bg-white md:flex">
          <CalendarHorizontal className="hidden md:block" maxHeight />
          <CalendarVertical className="md:hidden" />
          <ServiceCards />
        </div>
      </>
    </BookingContextProvider>
  );
}
