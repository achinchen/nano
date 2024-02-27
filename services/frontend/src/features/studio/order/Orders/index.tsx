import type { Status } from './types';
import { Fragment, useState } from 'react';
import OrderCards from '~frontend/features/studio/components/OrderCards';
import { ORDER } from '~frontend/shared/mock';
import StatusTabs from './components/StatusTabs';
import { STATUS } from './constants';

export default function Orders() {
  const [status, setStatus] = useState<Status>(STATUS.IN_PROGRESS);

  return (
    <Fragment>
      <header className="pa-4">
        <StatusTabs status={status} setStatus={setStatus} />
      </header>
      <section className="h-[calc(100dvh-188px)] overflow-y-scroll px-4 pb-4">
        {status === STATUS.IN_PROGRESS && (
          <OrderCards orders={[...ORDER.IN_PROGRESS]} />
        )}
        {status === STATUS.END && <OrderCards orders={[...ORDER.END]} />}
      </section>
    </Fragment>
  );
}
