import Icon from '~frontend/components/Icon';
import AttendeeTag from '~frontend/features/studio/components/AttendeeTag';
import EmphasizeBlock from '~frontend/shared/components/EmphasizeBlock';
import sharedI from '~frontend/shared/i.json';
import RadioGroup from '~frontend/components/RadioGroup';
import { useRequestOrderContext } from '~frontend/features/studio/order-requested/Detail/context';
import { formatDuration, getPeriodTime } from '~frontend/utils/time';
import { getMMDD } from '~frontend/utils/date';
import scopedI from './i.json';
import QueueDescription from './QueueDescriptionPrompt';

function QueueItem({ index }: { index: number }) {
  const { requirement, service } = useRequestOrderContext();

  if (!requirement || !service) return null;

  const { duration, attendee, queue } = service;

  const { currentAttendee, startAt, disabled, reason } =
    requirement.queues[index];

  const disabledClass = disabled ? 'color-zinc-500' : '';

  return (
    <span className="flex flex-1 gap-2">
      <span className={`text-base font-normal ${disabledClass}`}>
        {queue && `${sharedI.queue.order} ${index + 1}`}
      </span>
      <span className="w-full flex-1 translate-y--2">
        <span className="block border-px border-zinc-400 rounded-3 border-solid bg-white pa-2">
          <span className={disabledClass}>{getMMDD(startAt)}</span>
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
            <AttendeeTag
              attendee={attendee}
              currentAttendee={currentAttendee}
            />
          </span>
        </span>
        {reason && (
          <span className="mt-1 text-xs font-normal color-red-500">
            {reason}
          </span>
        )}
      </span>
    </span>
  );
}

export default function ConsumerRequirement() {
  const { requirement, selectedTime, setSelectedTime, service } =
    useRequestOrderContext();
  if (!requirement || !service) return null;

  const { queue } = service;

  const queueTimes = requirement.queues.map(({ startAt, disabled }) => ({
    value: startAt,
    disabled,
  }));

  return (
    <section className="my-0 text-sm">
      <div className="flex items-center gap-2">
        <Icon
          icon="i-solar-user-linear"
          className="color-primary-500"
          size="2xl"
        />
        <span>{scopedI.attendee}</span>
        <EmphasizeBlock>
          {requirement.attendee} {sharedI.unit.attendee}
        </EmphasizeBlock>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <Icon
          icon="i-solar-calendar-linear"
          className="color-primary-500"
          size="2xl"
        />
        {sharedI.queue.title}
        {queue && <QueueDescription />}
      </div>
      <form className="mx--4 my-4 bg-primary-100 px-4 pb-2 pt-6">
        <RadioGroup
          options={queueTimes}
          value={selectedTime}
          onChange={setSelectedTime}
          renderChildren={QueueItem}
        />
      </form>
    </section>
  );
}
