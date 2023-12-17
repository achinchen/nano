import { Fragment, lazy } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { MyOrderContextProvider } from '~frontend/features/my/order/context';
import Header from '~frontend/features/my/order/Header';

const Calendar = lazy(() => import('~frontend/features/my/order/Calendar'));

export default function MyOrdersLayout() {
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
      </Fragment>
    </MyOrderContextProvider>
  );
}
