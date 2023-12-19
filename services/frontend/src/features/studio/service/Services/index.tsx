import type { Status } from './types';
import { Fragment, useState } from 'react';
import ServiceCards from './components/Cards';
import StatusTabs from './components/StatusTabs';
import { STATUS } from './constants';

export default function Services() {
  const [status, setStatus] = useState<Status>(STATUS.IN_PROGRESS);
  return (
    <Fragment>
      <header className="pa-4">
        <StatusTabs status={status} setStatus={setStatus} />
      </header>
      <section className="h-[calc(100dvh-132px)] overflow-y-scroll px-4 pb-4 md:h-[calc(100dvh-188px)]">
        {status === STATUS.IN_PROGRESS && <ServiceCards />}
        {status === STATUS.END && <ServiceCards end />}
      </section>
    </Fragment>
  );
}
