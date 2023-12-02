import type { Content } from './types';
import { Fragment, useState } from 'react';
import OrderCards from './components/OrderCardWithDate';
import ContentTabs from './components/ContentTabs';
import { CONTENT } from './constants';

export default function OrdersContent() {
  const [currentContent, setCurrentContent] = useState<Content>(
    CONTENT.IN_PROGRESS
  );
  return (
    <Fragment>
      <header className="pa-4">
        <ContentTabs
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
        />
      </header>
      <section className="h-[calc(100dvh-188px)] overflow-y-scroll px-4 pb-4 md:h-[calc(100dvh-192px)]">
        {currentContent === CONTENT.IN_PROGRESS && <OrderCards />}
        {currentContent === CONTENT.END && <OrderCards />}
      </section>
    </Fragment>
  );
}
