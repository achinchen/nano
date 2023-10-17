import type { ServiceTime } from './type';
import { useServiceTimesContext } from '~frontend/features/booking/ServiceTimes/context';
import sharedI from '~frontend/shared/i.json';
import Icon from '~frontend/components/Icon';
import scopedI from './i.json';

const MAX_QUEUE_LENGTH = 3;
const CONTAINER =
  'pa-2 border-solid border-1 rounded-25 flex items-center justify-center font-bold text-sm tracking-wider';

const STATUS_CONFIG = {
  unselected: ' border-primary-300 color-primary-500 bg-white cursor-pointer',
  selected: 'border-primary-300 color-white bg-primary-500 cursor-pointer',
  disabled: 'border-zinc-100 color-zinc-400 bg-zinc-100 cursor-not-allowed',
};

function Time({ time, status, restAttendee }: ServiceTime) {
  const { queues, setQueues, queue: queueable } = useServiceTimesContext();

  const index = queues.indexOf(time);
  const selected = queues.includes(time);
  const disabled = status === 'full';

  const onToggle = () => {
    if (disabled) return;
    return setQueues((queues) => {
      const selected = queues.includes(time);
      if (!queueable) return selected ? [] : [time];
      if (!selected && queues.length < MAX_QUEUE_LENGTH)
        return [...queues, time];
      return queues.filter((timeInQueue) => timeInQueue !== time);
    });
  };

  return (
    <div className="flex-1">
      <div
        role="checkbox"
        aria-checked={selected}
        aria-disabled={disabled}
        onClick={onToggle}
        className={`position-relative ${CONTAINER} ${
          disabled
            ? STATUS_CONFIG.disabled
            : selected
            ? STATUS_CONFIG.selected
            : STATUS_CONFIG.unselected
        }`}
      >
        {time}
        {selected &&
          (queueable ? (
            <span className="position-absolute right-2 h-5 w-5 flex items-center justify-center rounded-full bg-zinc-700 text-xs font-normal color-white">
              {index + 1}
            </span>
          ) : (
            <Icon
              icon="i-solar-close-circle-bold"
              size="xl"
              className="position-absolute right-2 color-zinc-700"
            />
          ))}
      </div>
      <span
        className={`mx-2 text-xs font-normal color-red-500 ${
          restAttendee ? 'visible' : 'invisible'
        }`}
      >
        {scopedI.rest} {restAttendee} {sharedI.unit.attendee}
      </span>
    </div>
  );
}

export function Times() {
  const { times } = useServiceTimesContext();

  return (
    <div className="grid grid-cols-3 my-4 justify-between gap-4">
      {times.map((timeInfo) => (
        <Time key={timeInfo.time} {...timeInfo} />
      ))}
    </div>
  );
}

export default Times;
