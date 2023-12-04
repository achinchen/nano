import { Fragment } from 'react';
import {
  OrderDetailContent,
  OrderDetailHeader,
} from './components/OrderDetail';

export default function OrderRequestContent() {
  return (
    <Fragment>
      <OrderDetailHeader />
      <section className="h-[calc(100dvh-100px)] overflow-y-scroll px-4 pb-4 md:h-[calc(100dvh-164px)]">
        <OrderDetailContent />
      </section>
    </Fragment>
  );
}
