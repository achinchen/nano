import type { ServiceOrder } from '~frontend/features/cart/types';
import sharedI from '~frontend/shared/i.json';
import { formatDuration } from '~frontend/utils/time';
import IconButton from '~frontend/components/IconButton';
import Separator from '~frontend/components/Separator';
import { useOrderCardsContext, OrderCardsContextProvider } from './context';
import InfoBlock from './components/InfoBlock';
import scopedI from './i.json';
import TimeCards from './components/TimeCards';

function OrderCard(service: ServiceOrder) {
  const { onRemove, onUpdate } = useOrderCardsContext();
  const {
    id,
    queue,
    duration,
    attendee,
    name,
    address,
    supplier,
    times,
    expired,
  } = service;
  const onRemoveClick = () => onRemove(id);

  const onDecrease = () => {
    if (attendee === 0) return;
    onUpdate({
      ...service,
      attendee: attendee - 1,
    });
  };

  const onIncrease = () => {
    onUpdate({
      ...service,
      attendee: attendee + 1,
    });
  };

  const onUpdateTimes = (times: ServiceOrder['times']) => {
    if (times.length === 0) return onRemove(id);
    onUpdate({
      ...service,
      times,
    });
  };

  return (
    <section
      className={`relative mt-4 border-px border-zinc-200 rounded-2 border-solid pa-2 overflow-hidden ${
        expired
          ? 'after:block after:absolute after:w-full after:h-45 after:top-0 after:left-0 after:content-empty after:bg-white after:opacity-50'
          : ''
      }`}
    >
      <header className="flex items-start justify-between">
        <h2 className="line-clamp-2 text-xl font-bold">{name}</h2>
        <IconButton
          className="relative z-1 w-9"
          icon="i-solar-close-circle-outline"
          color="dark"
          variant="text"
          size="sm"
          onClick={onRemoveClick}
        />
      </header>
      <InfoBlock
        icon="i-solar-map-linear"
        title={sharedI.location}
        content={address}
      />
      <InfoBlock
        icon="i-solar-square-academic-cap-2-outline"
        title={sharedI.supplier}
        content={supplier}
      />
      <InfoBlock
        icon="i-solar-alarm-linear"
        title={scopedI.duration}
        content={formatDuration(duration)}
      />
      <Separator />
      {expired ? (
        <span className="relative z-1 text-sm color-red-500">
          {scopedI.expired}
        </span>
      ) : (
        <>
          <h3 className="mb-1">{sharedI.times}</h3>
          <TimeCards
            times={times}
            duration={duration}
            queue={queue}
            onUpdate={onUpdateTimes}
          />
          <Separator />
          <footer className="flex items-center justify-between">
            <span className="font-bold">{scopedI.attendee}</span>
            <div className="flex items-center justify-between gap-4">
              <IconButton
                icon="i-solar-add-circle-linear"
                variant="text"
                color="dark"
                size="md"
                onClick={onIncrease}
              />
              <span className="text-lg">{attendee}</span>
              <IconButton
                icon="i-solar-minus-circle-linear"
                variant="text"
                color="dark"
                size="md"
                onClick={onDecrease}
              />
            </div>
          </footer>
        </>
      )}
    </section>
  );
}

export function OrderCards({ className }: { className: string }) {
  const { services } = useOrderCardsContext();

  return (
    <section className={className}>
      {services.map((service) => (
        <OrderCard key={service.id} {...service} />
      ))}
    </section>
  );
}

export function OrderCardsWithProvider({ className }: { className: string }) {
  return (
    <OrderCardsContextProvider>
      <OrderCards className={className} />
    </OrderCardsContextProvider>
  );
}

export default OrderCardsWithProvider;
