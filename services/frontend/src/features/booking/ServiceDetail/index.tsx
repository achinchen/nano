import type { ServiceDetailProps } from './types';
import { useState } from 'react';
import i from '~frontend/shared/i.json';
import StatusTag from '~frontend/features/booking/components/StatusTag';
import { formatDuration } from '~frontend/utils/time';
import TextButton from '~frontend/components/TextButton';
import Separator from '~frontend/components/Separator';
import { formateDate } from '~frontend/utils/date';
import InfoBlock from './components/InfoBlock';
import DescriptionPrompt from './components/DescriptionPrompt';

export function ServiceDetail({
  name,
  supplier,
  duration,
  location,
  description,
  selectedDate,
  attendee,
  status,
}: ServiceDetailProps) {
  const [isDescriptionSheetOpen, setIsDescriptionSheetOpen] = useState(false);
  const onReadMoreClick = () => setIsDescriptionSheetOpen(true);
  const onDescriptionSheetClose = () => setIsDescriptionSheetOpen(false);

  return (
    <section>
      <h2 className="my-3 flex justify-between text-xl font-bold">
        {name} <StatusTag status={status} />
      </h2>
      <time>{formateDate(selectedDate)}</time>
      <Separator />
      <div className="mt-2 flex gap-2">
        <InfoBlock
          icon="i-solar-alarm-linear"
          title={i.duration}
          className="flex-1"
          content={formatDuration(duration)}
        />
        <InfoBlock
          icon="i-solar-square-academic-cap-2-outline"
          title={i.supplier}
          content={supplier}
          className="flex-1 border-x-px border-zinc-200 border-x-solid px-2"
        />
        <InfoBlock
          icon="i-solar-chair-linear"
          title={i.attendee}
          className="flex-1"
          content={`${attendee} ${i.unit.attendee}`}
        />
      </div>
      <InfoBlock
        icon="i-solar-map-linear"
        className="mt-3"
        title={i.location}
        content={`${location.name}(${location.address})`}
      />
      <Separator />
      <article className="mt-3">
        <h3 className="font-bold">{i.description}</h3>
        <p className="line-clamp-2 mb-2 mt-1 max-h-18 text-ellipsis font-normal color-zinc-600">
          {description}
        </p>
        <TextButton onClick={onReadMoreClick} className="text-sm md:text-base">
          {i.more}
        </TextButton>
      </article>
      <Separator />
      {isDescriptionSheetOpen && (
        <DescriptionPrompt
          title={i.description}
          description={description}
          onClose={onDescriptionSheetClose}
        />
      )}
    </section>
  );
}

export default ServiceDetail;
