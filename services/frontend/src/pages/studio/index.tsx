import { Fragment, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  StudioContextProvider,
  useStudioContext,
} from '~frontend/features/studio/context';
import CalendarVertical from '~frontend/features/studio/CalendarVertical';
import CalendarHorizontal from '~frontend/features/studio/CalendarHorizontal';
import CalendarWeekList from '~frontend/features/studio/CalendarWeekList';
import HomeContent from '~frontend/features/studio/HomeContent';
import HomeHeader from '~frontend/features/studio/HomeHeader';
import { getIsMobile } from '~frontend/utils/device';
import { CalendarVerticalContextProvider } from '~frontend/features/studio/CalendarVertical/context';

function Content() {
  const { setSelectedDate, isListMode } = useStudioContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const date = searchParams.get('date');
    if (!date) return;
  }, [setSelectedDate, searchParams]);

  return getIsMobile() ? (
    <div className="flex flex-col">
      {isListMode ? (
        <CalendarWeekList loose={false} />
      ) : (
        <Fragment>
          <CalendarVertical />
          <HomeContent />
        </Fragment>
      )}
    </div>
  ) : (
    <div className="flex flex-row bg-white">
      {isListMode ? <CalendarWeekList /> : <CalendarHorizontal />}
      <section className="flex-1 border-l-1 border-l-zinc-200 border-l-solid">
        <HomeContent />
      </section>
    </div>
  );
}

export default function Index() {
  return (
    <StudioContextProvider>
      <CalendarVerticalContextProvider>
        <Fragment>
          <HomeHeader />
          <Content />
        </Fragment>
      </CalendarVerticalContextProvider>
    </StudioContextProvider>
  );
}
