import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import sharedI from '~frontend/shared/i.json';
import featureI from '~frontend/features/studio/i.json';
import StatusTag from '~frontend/features/studio/components/StatusTag';
import { getPeriodTimes } from '~frontend/utils/time';
import Icon from '~frontend/components/Icon';
import Separator from '~frontend/components/Separator';
import { formateDate } from '~frontend/utils/date';
import EmphasizeBlock from '~frontend/shared/components/EmphasizeBlock';
import ServiceInfoBlocks from '~frontend/shared/components/InfoBlocks';
import ServiceDescriptionMore from '~frontend/shared/components/ServiceDescriptionMore';
import i from './i.json';

const service = {
  duration: 90,
  name: '創業諮詢',
  description:
    '這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。',
  currentAttendee: 4,
  allday: false,
  serviceId: 7,
  startAt: '2023-12-19T08:30',
  endAt: '2024-01-31T10:00',
  attendee: 1,
  supplier: '阿狗狗',
  location: {
    name: '台中',
    address: '407台中市西屯區臺灣大道三段251號',
  },
};

const {
  startAt,
  endAt,
  name,
  supplier,
  duration,
  location,
  description,
  attendee,
} = service;

const [startTime, endTime] = getPeriodTimes(startAt, duration);

export default function ServiceInfo() {
  const { id } = useParams<{ id?: string }>();

  return (
    <Fragment>
      <h2 className="my-3 flex justify-between text-xl font-bold">
        {name}
        <StatusTag end={Number(id) % 2 === 0} />
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
        <p className="line-clamp-8 mb-2 mt-1 max-h-42 font-normal color-zinc-600">
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
