import type { Content } from './types';
import { Fragment, useState } from 'react';
import ServiceCards from '~frontend/features/studio/ServiceCards/Default';
import ContentTabs from '~frontend/features/studio/ServicesContent/ContentTabs';
import { CONTENT } from './constants';

export default function HomePage() {
  const [currentContent, setCurrentContent] = useState<Content>(
    CONTENT.IN_PROGRESS
  );
  return (
    <Fragment>
      <ContentTabs
        currentContent={currentContent}
        setCurrentContent={setCurrentContent}
      />
      {currentContent === CONTENT.IN_PROGRESS && <ServiceCards />}
      {currentContent === CONTENT.END && <ServiceCards end />}
    </Fragment>
  );
}
