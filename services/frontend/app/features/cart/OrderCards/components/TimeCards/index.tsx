import Icon from '~frontend/components/Icon';
import IconButton from '~frontend/components/IconButton';
import { getMMDD } from '~frontend/utils/date';
import { getPeriodTime } from '~frontend/utils/time';
import i from './i.json';

type Time = string;

type Props = {
  times: Time[];
  duration: number;
  queue: boolean;
};

function TimeCard({
  time,
  queue,
  duration,
  order,
}: {
  order: number;
  time: Time;
  duration: number;
  queue: boolean;
}) {
  const date = new Date(time);
  const dateString = getMMDD(date);
  const timeString = getPeriodTime(time, duration);

  const onRemove = () => {
    console.log('remove');
  };

  return (
    <div className="flex items-start gap-2">
      {queue && (
        <span className="my-2 font-normal">
          {i.order}
          {order}
        </span>
      )}
      <div className="flex flex-1 flex-col">
        <div className="flex gap-2 border-px border-zinc-400 rounded-3 border-solid px-3 py-2">
          {queue && (
            <Icon
              className="mt-0.5"
              icon="i-solar-hamburger-menu-linear"
              size="xl"
            />
          )}
          <span className="flex flex-col tracking-wider md:flex-row">
            <span>{dateString}</span>
            <span>{timeString}</span>
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

export function TimeCards({ times, duration, queue }: Props) {
  return (
    <section>
      {times.map((time, index) => (
        <TimeCard
          // eslint-disable-next-line react/no-array-index-key
          key={index + 1}
          order={index + 1}
          time={time}
          duration={duration}
          queue={queue}
        />
      ))}
    </section>
  );
}

export default TimeCards;
