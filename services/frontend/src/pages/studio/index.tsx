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

const provider = '阿狗狗的快樂小天地';

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
      <section className="h-[calc(100dvh-156px)] flex-1 overflow-y-scroll border-l-1 border-l-zinc-200 border-l-solid pa-4">
        <HomeContent />
      </section>
    </div>
  );
}

export default function Index() {
  return (
    <StudioContextProvider>
      <>
        <h1 className="mx-6 my-2 hidden text-4xl color-white md:block">
          {provider}
        </h1>
        <CalendarVerticalContextProvider>
          <Fragment>
            <HomeHeader />
            <Content />
          </Fragment>
        </CalendarVerticalContextProvider>
      </>
    </StudioContextProvider>
  );
}
