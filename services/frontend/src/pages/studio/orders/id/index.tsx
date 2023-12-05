import { Fragment, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  StudioContextProvider,
  useStudioContext,
} from '~frontend/features/studio/context';
import CalendarHorizontal from '~frontend/features/studio/CalendarHorizontal';
import CalendarWeekList from '~frontend/features/studio/CalendarWeekList';
import OrderContent from '~frontend/features/studio/OrderContent';
import OrdersHeader from '~frontend/features/studio/OrdersHeader';

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
        {isListMode ? (
          <CalendarWeekList type="order" />
        ) : (
          <CalendarHorizontal type="order" />
        )}
      </section>
      <section className="flex-1 md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
        <OrderContent />
      </section>
    </div>
  );
}

export default function Index() {
  return (
    <StudioContextProvider>
      <Fragment>
        <OrdersHeader smHidden />
        <Content />
      </Fragment>
    </StudioContextProvider>
  );
}
