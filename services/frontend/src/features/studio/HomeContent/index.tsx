import type { Content } from './types';
import { useState } from 'react';
import ServiceSimpleCards from '~frontend/features/studio/ServiceCards/Simple';
import ContentTabs from '~frontend/features/studio/HomeContent/ContentTabs';
import OrderCards from '~frontend/features/studio/OrderCards';
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
        className={`overflow-y-scroll px-4 ${
          mode === 'week'
            ? 'max-h-[calc(100dvh-276px)]'
            : 'max-h-[calc(100dvh-476px)]'
        }`}
      >
        {currentContent === CONTENT.ORDER && <OrderCards />}
        {currentContent === CONTENT.SERVICE && <ServiceSimpleCards />}
      </section>
    </main>
  );
}
