import type { Content } from './types';
import { Fragment, useState } from 'react';
import ServiceSimpleCards from '~frontend/features/studio/ServiceCards/Simple';
import ContentTabs from '~frontend/features/studio/HomeContent/ContentTabs';
import OrderCards from '~frontend/features/studio/OrderCards';
import { CONTENT } from './constants';

export default function HomePage() {
  const [currentContent, setCurrentContent] = useState<Content>(
    CONTENT.SERVICE
  );
  return (
    <Fragment>
      <ContentTabs
        currentContent={currentContent}
        setCurrentContent={setCurrentContent}
      />
      {currentContent === CONTENT.ORDER && <OrderCards />}
      {currentContent === CONTENT.SERVICE && <ServiceSimpleCards />}
    </Fragment>
  );
}
