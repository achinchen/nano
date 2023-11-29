import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import sharedI from '~frontend/shared/i.json';
import StatusTag from '~frontend/features/studio/components/StatusTag';
import { formatDuration, getPeriodTimes } from '~frontend/utils/time';
import Icon from '~frontend/components/Icon';
import TextButton from '~frontend/components/TextButton';
import Separator from '~frontend/components/Separator';
import { getMMDD, getYYYYMMDD } from '~frontend/utils/date';
import i from './i.json';
import InfoBlock from './components/InfoBlock';
import DescriptionPrompt from './components/DescriptionPrompt';
import EmphasizeBlock from './components/EmphasizeBlock';

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

const formateDate = (date: string) => {
  const today = new Date();
  const target = new Date(date);
  const isThisYear = today.getFullYear() === target.getFullYear();
  return isThisYear ? getMMDD(target) : getYYYYMMDD(target);
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
  const [isDescriptionSheetOpen, setIsDescriptionSheetOpen] = useState(false);
  const onReadMoreClick = () => setIsDescriptionSheetOpen(true);
  const onDescriptionSheetClose = () => setIsDescriptionSheetOpen(false);
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
      <div className="mt-2 flex items-center gap-2 text-sm font-normal">
        <Icon
          icon="i-solar-clock-circle-linear"
          className="color-primary-500"
          size="2xl"
        />
        <span className="font-normal">{i.time}</span>
        <EmphasizeBlock>{startTime}</EmphasizeBlock>
        {i.to}
        <EmphasizeBlock>{endTime}</EmphasizeBlock>
      </div>
      <Separator />
      <article className="mt-3">
        <h3 className="text-base font-bold">{sharedI.description}</h3>
        <p className="line-clamp-8 mb-2 mt-1 max-h-42 font-normal color-zinc-600">
          {description}
        </p>
        <TextButton onClick={onReadMoreClick} className="text-sm md:text-base">
          {sharedI.more}
        </TextButton>
      </article>
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
          className="flex-1 border-x-px border-zinc-200 border-x-solid px-2"
        />
        <InfoBlock
          icon="i-solar-chair-linear"
          title={sharedI.attendee}
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
      {isDescriptionSheetOpen && (
        <DescriptionPrompt
          title={sharedI.description}
          description={description}
          onClose={onDescriptionSheetClose}
        />
      )}
    </Fragment>
  );
}
