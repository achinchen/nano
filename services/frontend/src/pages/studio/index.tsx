import { Fragment } from 'react';
import { StudioContextProvider } from '~frontend/features/studio/context';
import Calendar from '~frontend/features/studio/home/Calendar';
import Header from '~frontend/features/studio/home/Header';
import { CalendarModeSwitchableContextProvider } from '~frontend/shared/components/CalendarModeSwitchable/context';
import Home from '~frontend/features/studio/home/Home';

export default function Index() {
  return (
    <StudioContextProvider>
      <CalendarModeSwitchableContextProvider>
        <Fragment>
          <Header />
          <div className="flex flex-col md:flex-row md:bg-white">
            <Calendar />
            <section className="flex-1 border-l-1 border-l-zinc-200 border-l-solid">
              <Home />
            </section>
          </div>
        </Fragment>
      </CalendarModeSwitchableContextProvider>
    </StudioContextProvider>
  );
}
