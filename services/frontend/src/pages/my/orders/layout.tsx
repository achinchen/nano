import { Fragment, lazy } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { MyOrderContextProvider } from '~frontend/features/my/order/context';
import Header from '~frontend/features/my/order/Header';
import useBg from '~frontend/shared/hooks/use-bg';
import NotificationPrompt from '~frontend/features/my/order/NotificationPrompt';
import { BG } from './constants';
const Calendar = lazy(() => import('~frontend/features/my/order/Calendar'));

export default function MyOrdersLayout() {
  useBg(BG);
  const { pathname } = useLocation();
  const isIndex = pathname === '/my/orders';

  return (
    <MyOrderContextProvider>
      <Fragment>
        <Header smHidden={!isIndex} />
        <div className="flex flex-row bg-white">
          <section className="hidden md:block">
            <Calendar />
          </section>
          <section className="relative flex-1 md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
            <Outlet />
          </section>
        </div>
        <NotificationPrompt />
      </Fragment>
    </MyOrderContextProvider>
  );
}
