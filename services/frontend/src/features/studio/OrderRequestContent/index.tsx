import { Fragment } from 'react';
import OrderDetail from './OrderDetail';
import Footer from './Footer';
import { RequestOrderContextProvider } from './context';

export default function OrderContent() {
  return (
    <RequestOrderContextProvider>
      <Fragment>
        <section className="h-[calc(100dvh-116px)] overflow-y-scroll px-4 pb-4 md:h-[calc(100dvh-180px)]">
          <OrderDetail />
        </section>
        <Footer />
      </Fragment>
    </RequestOrderContextProvider>
  );
}
