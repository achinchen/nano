import { Fragment, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { StudioContextProvider } from '~frontend/features/studio/context';
import Header from '~frontend/features/studio/order-requested/Header';
const Calendar = lazy(
  () => import('~frontend/features/studio/order-requested/Calendar')
);

export default function Index() {
  const { pathname } = useLocation();
  const isIndex = pathname === '/studio/orders/requested';

  return (
    <StudioContextProvider>
      <Fragment>
        <Header smHidden={!isIndex} />
        <div className="flex flex-col md:flex-row md:bg-white">
          <section className="hidden md:block">
            <Calendar />
          </section>
          <section className="h-[calc(100dvh-52px)] flex-1 overflow-y-scroll md:h-[calc(100dvh-112px)] md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
            <Outlet />
          </section>
        </div>
      </Fragment>
    </StudioContextProvider>
  );
}
