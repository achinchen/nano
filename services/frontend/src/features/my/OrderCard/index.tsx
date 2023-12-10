import type { Order } from '~frontend/features/my/types';
import { useNavigate } from 'react-router-dom';
import { isBefore, getYYYYMMDD } from '~frontend/utils/date';
import { getPeriodTime } from '~frontend/utils/time';
import Icon from '~frontend/components/Icon';
import Separator from '~frontend/components/Separator';
import Button from '~frontend/components/Button';
import IconButton from '~frontend/components/IconButton';
import UpdateTag from '~frontend/features/my/components/UpdateTag';
import { useMyContext } from '~frontend/features/my/context';
import i from './i.json';

export default function OrderCard({
  id,
  name,
  updatedAt,
  queues,
  duration,
  status,
}: Order) {
  const navigate = useNavigate();
  const { visitedAt } = useMyContext();

  const onMoreClick = () => navigate(`/my/orders/${id}`);
  const onCalendarEventClick = () => navigate(`/my/orders/${id}/calendar`);
  const end = status === 'end';
  const TEXT_CLASSNAME = end ? 'color-zinc-500' : 'color-zinc-700';

  return (
    <section className="mt-2 border-px border-zinc-200 rounded-3 border-solid pa-2">
      <header className={`flex items-center justify-between ${TEXT_CLASSNAME}`}>
        {name}
        {isBefore(new Date(updatedAt), visitedAt) && <UpdateTag />}
      </header>
      {queues.map((datetime) => (
        <div key={`order-card-${id}-time-${datetime}`}>
          <Icon
            size="2xl"
            icon="i-solar-alarm-linear"
            className="mr-1 flex-shrink-0 color-primary-500"
          />
          <span className="whitespace-pre text-sm">
            <span className={`mx-1 ${TEXT_CLASSNAME}`}>
              {getYYYYMMDD(datetime)} ·
            </span>
            <span className="color-zinc-500">
              {getPeriodTime(datetime, duration)}
            </span>
          </span>
        </div>
      ))}
      <Separator size="sm" />
      <footer className="flex gap-2">
        <Button
          size="sm"
          className="flex-1"
          color="primary"
          variant="outline"
          onClick={onMoreClick}
        >
          {i.more}
        </Button>
        {end || (
          <IconButton
            size="sm"
            variant="outline"
            className="flex-shrink-1 flex-grow-0"
            icon="i-solar-calendar-add-bold"
            onClick={onCalendarEventClick}
          />
        )}
      </footer>
    </section>
  );
}
