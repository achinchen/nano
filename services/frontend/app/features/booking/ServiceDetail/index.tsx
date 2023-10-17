import type { ServiceDetailProps } from './types';
import { useState } from 'react';
import sharedI from '~frontend/shared/i.json';
import StatusTag from '~frontend/features/booking/components/StatusTag';
import { formatDuration } from '~frontend/features/booking/utils';
import TextButton from '~frontend/components/TextButton';
import Separator from '~frontend/components/Separator';
import InfoBlock from './components/InfoBlock';
import DescriptionPrompt from './components/DescriptionPrompt';
import { formatDate } from './utils';
import scopedI from './i.json';

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
      <time>{formatDate(selectedDate)}</time>
      <Separator />
      <div className="mt-2 flex gap-2">
        <InfoBlock
          icon="i-solar-alarm-linear"
          title={sharedI.duration}
          className="flex-1"
          content={formatDuration(duration)}
        />
        <InfoBlock
          icon="i-solar-square-academic-cap-2-outline"
          title={sharedI.supplier}
          content={supplier}
          className="flex-1 border-l-2 border-r-2 border-zinc-200 border-l-solid border-r-solid px-2"
        />
        <InfoBlock
          icon="i-solar-chair-linear"
          title={scopedI.attendee}
          className="flex-1"
          content={`${attendee} ${sharedI.unit.attendee}`}
        />
      </div>
      <InfoBlock
        icon="i-solar-map-linear"
        className="mt-3"
        title={sharedI.location}
        content={`${location.name}(${location.address})`}
      />
      <Separator />
      <article className="mt-3">
        <h3 className="font-bold">{scopedI.description}</h3>
        <p className="line-clamp-2 mb-2 mt-1 max-h-18 text-ellipsis font-normal color-zinc-600">
          {description}
        </p>
        <TextButton onClick={onReadMoreClick}>{scopedI.more}</TextButton>
      </article>
      <Separator />
      {isDescriptionSheetOpen && (
        <DescriptionPrompt
          title={scopedI.description}
          description={description}
          onClose={onDescriptionSheetClose}
        />
      )}
    </section>
  );
}

export default ServiceDetail;
