import { Fragment } from 'react';
import Header from './components/Header';
import Content from './components/Content';

export default function OrderRequestContent() {
  return (
    <Fragment>
      <Header />
      <section className="h-[calc(100dvh-100px)] overflow-y-scroll px-4 pb-4 md:h-[calc(100dvh-164px)]">
        <Content />
      </section>
    </Fragment>
  );
}
