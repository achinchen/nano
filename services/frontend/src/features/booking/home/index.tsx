import { Fragment, lazy } from 'react';
import {
  CalendarModeSwitchableContextProvider,
  useCalendarModeSwitchableContext,
} from '~frontend/shared/components/CalendarModeSwitchable/context';
import CalendarModeSwitchable from '~frontend/shared/components/CalendarModeSwitchable';
import Header from '~frontend/features/booking/components/Header';
import ServiceCards from './components/ServiceCards';

const Calendar = lazy(
  () => import('~frontend/features/booking/components/Calendar')
);

function Content() {
  const { mode } = useCalendarModeSwitchableContext();

  return (
    <div className="flex flex-col bg-white md:flex-row">
      <Calendar className="hidden md:block" />
      <CalendarModeSwitchable className="md:hidden" />
      <section
        className={`overflow-y-scroll flex-1 md:max-h-[calc(100dvh-116px)] ${
          mode === 'week'
            ? 'max-h-[calc(100dvh-188px)]'
            : 'max-h-[calc(100dvh-388px)]'
        }`}
      >
        <ServiceCards />
      </section>
    </div>
  );
}

export default function Index() {
  return (
    <Fragment>
      <Header />
      <CalendarModeSwitchableContextProvider>
        <Content />
      </CalendarModeSwitchableContextProvider>
    </Fragment>
  );
}
