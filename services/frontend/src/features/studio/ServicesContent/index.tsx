import type { Content } from './types';
import { Fragment, useState } from 'react';
import ServiceCards from '~frontend/features/studio/ServiceCards/Default';
import ContentTabs from '~frontend/features/studio/ServicesContent/ContentTabs';
import { CONTENT } from './constants';

export default function ServicesContent() {
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
      <section className="h-[calc(100dvh-188px)] overflow-y-scroll px-4 pb-4">
        {currentContent === CONTENT.IN_PROGRESS && <ServiceCards />}
        {currentContent === CONTENT.END && <ServiceCards end />}
      </section>
    </Fragment>
  );
}
