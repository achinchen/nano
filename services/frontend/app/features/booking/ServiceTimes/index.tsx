'use client';

import type { ServiceTimesProps } from './type';
import Icon from '~frontend/components/Icon';
import { ServiceTimesContextProvider, useServiceTimesContext } from './context';
import Times from './components/Times';
import i from './i.json';

function ServiceTimes() {
  const { times, queue: queueable } = useServiceTimesContext();
  return (
    <section>
      <header>
        <h2 className="text-xl font-bold">{i.title}</h2>
      </header>
      {times.length ? (
        <>
          {queueable && (
            <div className="my-1 flex items-center gap-2 rounded-5 bg-orange-100 pa-2 text-sm color-orange-500">
              <Icon
                icon="i-solar-info-circle-bold"
                size="2xl"
                className="flex-shrink-0"
              />
              <span>{i.reminder}</span>
            </div>
          )}
          <Times />
        </>
      ) : (
        <span className="text-sm font-normal">{i.full}</span>
      )}
    </section>
  );
}

export function ServiceTimesWithProvider({ times, queue }: ServiceTimesProps) {
  return (
    <ServiceTimesContextProvider times={times} queue={queue}>
      <ServiceTimes />
    </ServiceTimesContextProvider>
  );
}

export default ServiceTimesWithProvider;
