import type { Service } from '~frontend/features/studio/types';
import InfoBlocks from '~frontend/shared/components/InfoBlocks';
import OrderFields from '~frontend/features/studio/components/OrderFields';
import Separator from '~frontend/components/Separator';

export default function ServiceSummary({
  title,
  description,
  attendee,
  duration,
  location,
  supplier,
  queue,
}: Omit<Service, 'name' | 'id'> & { title: string; titleSize?: 'sm' | 'md' }) {
  return (
    <div className="my-2 font-normal color-zinc-600">
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
