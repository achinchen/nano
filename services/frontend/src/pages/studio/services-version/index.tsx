import { Fragment, lazy } from 'react';
import { StudioContextProvider } from '~frontend/features/studio/context';
import Detail from '~frontend/features/studio/service-version/Detail';
import Header from '~frontend/features/studio/service-version/Header';
import useBg from '~frontend/shared/hooks/use-bg';
import { BG } from './constants';

const Calendar = lazy(
  () => import('~frontend/features/studio/service-version/Calendar')
);

export default function Index() {
  useBg(BG);
  return (
    <StudioContextProvider>
      <Fragment>
        <Header />
        <div className="flex flex-col md:flex-row md:bg-white">
          <section className="hidden md:block">
            <Calendar />
          </section>
          <section className="max-h-[calc(100dvh-52px)] flex-1 overflow-y-scroll pa-4 md:h-[calc(100dvh-112px)] md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
            <Detail />
          </section>
        </div>
      </Fragment>
    </StudioContextProvider>
  );
}
