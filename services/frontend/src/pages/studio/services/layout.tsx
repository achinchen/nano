import { Fragment, lazy } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { StudioContextProvider } from '~frontend/features/studio/context';
import Header from '~frontend/features/studio/service/Header';
const Calendar = lazy(
  () => import('~frontend/features/studio/service/Calendar')
);
export default function Index() {
  const { pathname } = useLocation();
  const isIndex = pathname === '/studio/services/';

  return (
    <StudioContextProvider>
      <Fragment>
        <Header smHidden={!isIndex} />
        <div className="flex flex-col md:flex-row md:bg-white">
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
