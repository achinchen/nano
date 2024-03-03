import type { ServiceDetail } from '~frontend/features/studio/types';
import { Fragment } from 'react';
import sharedI from '~frontend/shared/i.json';
import featureI from '~frontend/features/studio/i.json';
import StatusTag from '~frontend/features/studio/components/StatusTag';
import { getTime } from '~frontend/utils/time';
import Icon from '~frontend/components/Icon';
import Separator from '~frontend/components/Separator';
import { formateDate, isBefore } from '~frontend/utils/date';
import EmphasizeBlock from '~frontend/shared/components/EmphasizeBlock';
import ServiceInfoBlocks from '~frontend/shared/components/InfoBlocks';
import ServiceDescriptionMore from '~frontend/shared/components/ServiceDescriptionMore';
import i from './i.json';

export default function ServiceInfo({
  name,
  supplier,
  duration,
  location,
  description,
  attendee,
  startAt,
  endAt,
}: ServiceDetail) {
  const startTime = getTime(startAt);
  const endTime = getTime(endAt);
  const end = isBefore(new Date(), new Date(endAt));

  return (
    <Fragment>
      <h2 className="my-3 flex justify-between text-xl font-bold">
        {name}
        <StatusTag end={end} />
      </h2>
      <div className="flex items-center gap-2 text-sm">
        <Icon
          icon="i-solar-calendar-linear"
          className="color-primary-500"
          size="2xl"
        />
        <span className="font-normal">{i.date}</span>
        <EmphasizeBlock>
          {formateDate(startAt)} － {formateDate(endAt)}
        </EmphasizeBlock>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <Icon
          icon="i-solar-clock-circle-linear"
          className="color-primary-500"
          size="2xl"
        />
        <span className="font-normal">{i.time}</span>
        <EmphasizeBlock>{startTime}</EmphasizeBlock>
        {featureI.to}
        <EmphasizeBlock>{endTime}</EmphasizeBlock>
      </div>
      <Separator />
      <article className="mt-3">
        <h3 className="text-base font-bold">{sharedI.description}</h3>
        <p className="line-clamp-8 mb-2 mt-1 max-h-42 whitespace-break-spaces font-normal">
          {description}
        </p>
        <ServiceDescriptionMore
          title={sharedI.description}
          description={description}
        >
          {sharedI.more}
        </ServiceDescriptionMore>
      </article>
      <Separator />
      <ServiceInfoBlocks
        attendee={attendee}
        duration={duration}
        location={location}
        supplier={supplier}
      />
    </Fragment>
  );
}
