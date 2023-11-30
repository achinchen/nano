import { Fragment, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  StudioContextProvider,
  useStudioContext,
} from '~frontend/features/studio/context';
import CalendarHorizontal from '~frontend/features/studio/CalendarHorizontal';
import CalendarWeekList from '~frontend/features/studio/CalendarWeekList';
import ServiceDetail from '~frontend/features/studio/ServiceDetail';
import ServicesHeader from '~frontend/features/studio/ServicesHeader';

function Content() {
  const { setSelectedDate, isListMode } = useStudioContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const date = searchParams.get('date');
    if (!date) return;
  }, [setSelectedDate, searchParams]);

  return (
    <div className="flex flex-col md:flex-row md:bg-white">
      <section className="hidden md:block">
        {isListMode ? <CalendarWeekList /> : <CalendarHorizontal />}
      </section>
      <section className="max-h-[calc(100dvh-52px)] flex-1 overflow-y-scroll pa-4 md:max-h-[calc(100dvh-112px)] md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
        <ServiceDetail />
      </section>
    </div>
  );
}

export default function Index() {
  return (
    <StudioContextProvider>
      <Fragment>
        <ServicesHeader smHidden />
        <Content />
      </Fragment>
    </StudioContextProvider>
  );
}
