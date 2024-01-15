import { Fragment, lazy } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { StudioContextProvider } from '~frontend/features/studio/context';
import Header from '~frontend/features/studio/service/Header';
import useBg from '~frontend/shared/hooks/use-bg';
import { BG } from './constants';
const Calendar = lazy(
  () => import('~frontend/features/studio/service/Calendar')
);

export default function Index() {
  useBg(BG);
  const { pathname } = useLocation();
  const isIndex = pathname === '/studio/services/';

  return (
    <StudioContextProvider>
      <Fragment>
        <Header smHidden={!isIndex} />
        <div className="h-full flex flex-col md:flex-row md:bg-white">
          <section className="hidden md:block">
            <Calendar />
          </section>
          <section className="flex-1 md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
            <Outlet />
          </section>
        </div>
      </Fragment>
    </StudioContextProvider>
  );
}
