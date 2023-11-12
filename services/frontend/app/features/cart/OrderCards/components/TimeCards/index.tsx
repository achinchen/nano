import type { Index } from './hooks/sortable';
import Icon from '~frontend/components/Icon';
import IconButton from '~frontend/components/IconButton';
import { getMMDD } from '~frontend/utils/date';
import { getPeriodTime } from '~frontend/utils/time';
import { SortableContainer, useSortableItem } from './hooks/sortable';
import i from './i.json';

type Time = string;

type Props = {
  times: Time[];
  duration: number;
  queue: boolean;
  onUpdate: (times: Time[]) => void;
};

function TimeCard({
  time,
  queue,
  duration,
  order,
  onRemove,
}: {
  order: number;
  time: Time;
  onRemove: () => void;
} & Pick<Props, 'duration' | 'queue'>) {
  const date = new Date(time);
  const dateString = getMMDD(date);
  const timeString = getPeriodTime(time, duration);
  const { setNodeRef, activatorProps, style } = useSortableItem({ id: time });

  return (
    <div className="flex items-start gap-2">
      {queue && (
        <span className="my-2 font-normal">
          {i.order}
          {order}
        </span>
      )}
      <div className="flex flex-1 flex-col" ref={setNodeRef} style={style}>
        <div className="flex gap-2 border-px border-zinc-400 rounded-3 border-solid bg-white px-3 py-2">
          {queue && (
            <Icon
              className="mt-0.5"
              icon="i-solar-hamburger-menu-linear"
              size="xl"
              {...activatorProps}
            />
          )}
          <span className="flex flex-col text-sm tracking-wider md:flex-row">
            <span>{dateString}</span>
            <span className="color-zinc-500">{timeString}</span>
          </span>
        </div>
        <span className="h-4 text-sm color-red-500"></span>
      </div>
      <IconButton
        icon="i-solar-trash-bin-2-bold"
        variant="text"
        color="dark"
        size="sm"
        onClick={onRemove}
      />
    </div>
  );
}

export function TimeCards({ times, duration, queue, onUpdate }: Props) {
  const onSwitch = (from: Index, to: Index) => {
    [times[from], times[to]] = [times[to], times[from]];
    onUpdate([...times]);
  };

  const onRemove = (index: number) => () => {
    times.splice(index, 1);
    onUpdate([...times]);
  };

  return (
    <section className="relative">
      {SortableContainer<Time>({
        onSwitch,
        items: times.map((time) => ({ id: time, data: time })),
        renderSortableItem: (data: Time, index) => {
          return (
            <TimeCard
              time={data}
              queue={queue}
              key={index + 1}
              duration={duration}
              order={index + 1}
              onRemove={onRemove(index)}
            />
          );
        },
      })}
    </section>
  );
}

export default TimeCards;