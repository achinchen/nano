import type { Props } from '~frontend/features/my/order/OrderDetail/TimeCard/types';
import { Fragment } from 'react';
import { formatDuration, getPeriodTime } from '~frontend/utils/time';
import { getMMDD } from '~frontend/utils/date';
import Icon from '~frontend/components/Icon';
import sharedI from '~frontend/shared/i.json';

export default function QueueItem({ queues, duration }: Props) {
  return (
    <Fragment>
      <h4 className="text-base font-bold">{sharedI.queue.title}</h4>
      <div className="mt-1 flex flex-col gap-2 rounded-3 bg-primary-100 px-4 pb-4 pt-7 text-sm">
        {queues?.map(({ startAt }, index) => (
          <span className="flex flex-1 gap-2" key={startAt}>
            <span className="text-base font-normal">
              {sharedI.queue.order} {index + 1}
            </span>
            <span className="w-full flex-1 translate-y--2">
              <span className="block border-px border-zinc-400 rounded-3 border-solid bg-white pa-2">
                <span>{getMMDD(startAt)}</span>
                <span className="ml-2 color-zinc-500">
                  {getPeriodTime(startAt, duration)}
                </span>
                <span className="mt-2 flex items-center gap-2">
                  <Icon
                    icon="i-solar-alarm-linear"
                    className="color-primary-500"
                    size="2xl"
                  />
                  <span className="mr-auto color-zinc-500">
                    {formatDuration(duration)}
                  </span>
                </span>
              </span>
            </span>
          </span>
        ))}
      </div>
    </Fragment>
  );
}
