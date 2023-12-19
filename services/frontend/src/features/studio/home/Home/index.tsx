import type { Content } from './types';
import { Fragment, useState } from 'react';
import OrderCards from '~frontend/features/studio/components/OrderCards';
import { useCalendarModeSwitchableContext } from '~frontend/shared/components/CalendarModeSwitchable/context';
import ContentTabs from './components/ContentTabs';
import ServiceCards from './components/ServiceCards';
import { CONTENT } from './constants';

export default function HomeContent() {
  const [currentContent, setCurrentContent] = useState<Content>(
    CONTENT.SERVICE
  );

  const { mode } = useCalendarModeSwitchableContext();

  return (
    <Fragment>
      <ContentTabs
        currentContent={currentContent}
        setCurrentContent={setCurrentContent}
      />
      <section
        className={`overflow-y-scroll px-4 pb-4 md:h-[calc(100dvh-184px)] ${
          mode === 'week' ? 'h-[calc(100dvh-276px)]' : 'h-[calc(100dvh-472px)]'
        }`}
      >
        {currentContent === CONTENT.ORDER && <OrderCards />}
        {currentContent === CONTENT.SERVICE && <ServiceCards />}
      </section>
    </Fragment>
  );
}
