import { Fragment, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { StudioContextProvider } from '~frontend/features/studio/context';
import OrdersHeader from '~frontend/features/studio/order/Header';
import useBg from '~frontend/shared/hooks/use-bg';
import { BG } from './constants';

const Calendar = lazy(() => import('~frontend/features/studio/order/Calendar'));

export default function Index() {
  useBg(BG);
  const { pathname } = useLocation();
  const isIndex = pathname === '/studio/orders/';

  return (
    <StudioContextProvider>
      <Fragment>
        <OrdersHeader smHidden={!isIndex} />
        <div className="flex flex-col md:flex-row md:bg-white">
          <section className="hidden md:block">
            <Calendar />
          </section>
          <section className="relative flex-1 md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
            <Outlet />
          </section>
        </div>
      </Fragment>
    </StudioContextProvider>
  );
}
