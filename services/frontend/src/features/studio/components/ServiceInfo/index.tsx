import type { Service } from '~frontend/features/studio/types';
import InfoBlocks from '~frontend/features/studio/components/InfoBlocks';
import OrderFields from '~frontend/features/studio/components/OrderFields';
import Separator from '~frontend/components/Separator';

export default function ServiceInfo({
  title,
  description,
  attendee,
  duration,
  location,
  supplier,
  queue,
}: Omit<Service, 'name' | 'id'> & { title: string }) {
  return (
    <div className="my-2 h-112 overflow-y-scroll px-4 font-normal color-zinc-600">
      <h3 className="text-base">{title}</h3>
      <p className="mt-0">{description}</p>
      <Separator />
      <InfoBlocks
        duration={duration}
        attendee={attendee}
        location={location}
        supplier={supplier}
      />
      <OrderFields queue={queue} />
    </div>
  );
}