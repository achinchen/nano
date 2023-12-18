import type { Content } from './types';
import { useState } from 'react';
import ServiceSimpleCards from '~frontend/features/studio/ServiceCards/Simple';
import ContentTabs from '~frontend/features/studio/HomeContent/ContentTabs';
import OrderCards from '~frontend/features/studio/components/OrderCards';
import { useCalendarVerticalContext } from '~frontend/features/studio/CalendarVertical/context';
import { CONTENT } from './constants';

export default function HomeContent() {
  const [currentContent, setCurrentContent] = useState<Content>(
    CONTENT.SERVICE
  );

  const { mode } = useCalendarVerticalContext();

  return (
    <main className="flex-1">
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
        {currentContent === CONTENT.SERVICE && <ServiceSimpleCards />}
      </section>
    </main>
  );
}
