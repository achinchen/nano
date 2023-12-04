import { Fragment, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  StudioContextProvider,
  useStudioContext,
} from '~frontend/features/studio/context';
import CalendarHorizontal from '~frontend/features/studio/CalendarHorizontal';
import CalendarWeekList from '~frontend/features/studio/CalendarWeekList';
import OrderRequestContent from '~frontend/features/studio/OrderRequestContent';
import OrderRequestHeader from '~frontend/features/studio/OrderRequestHeader';

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
        {isListMode ? <CalendarWeekList /> : <CalendarHorizontal type="all" />}
      </section>
      <section className="flex-1 md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
        <OrderRequestContent />
      </section>
    </div>
  );
}

export default function Index() {
  return (
    <StudioContextProvider>
      <Fragment>
        <OrderRequestHeader smHidden />
        <Content />
      </Fragment>
    </StudioContextProvider>
  );
}
