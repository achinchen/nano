import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import sharedI from '~frontend/shared/i.json';
import TextButton from '~frontend/components/TextButton';
import featureI from '~frontend/features/studio/i.json';
import StatusTag from '~frontend/features/studio/components/StatusTag';
import AttendeeTag from '~frontend/features/studio/components/AttendeeTag';
import { getPeriodTimes } from '~frontend/utils/time';
import ServiceInfoBlocks from '~frontend/features/studio/components/InfoBlocks';
import Separator from '~frontend/components/Separator';
import { formateDate } from '~frontend/features/studio/utils';
import EmphasizeBlock from '~frontend/features/studio/components/EmphasizeBlock';
import InfoPrompt from './components/InfoPrompt';
import i from './i.json';

const service = {
  duration: 90,
  name: '創業諮詢',
  description:
    '這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。這服務敘述是一段沒有意義的話，這服務敘述是一段沒有意義的話。',
  currentAttendee: 1,
  queue: false,
  serviceId: 7,
  startAt: '2023-12-19T08:30',
  endAt: '2024-01-31T10:00',
  attendee: 4,
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
  currentAttendee,
  queue,
  attendee,
} = service;

const [startTime, endTime] = getPeriodTimes(startAt, duration);

export default function ServiceInfo() {
  const [open, setOpen] = useState(false);
  const onDescriptionSheetClose = () => setOpen(false);
  const onMoreClick = () => setOpen(true);
  const { id: paramsId } = useParams<{ id?: string }>();
  const id = Number(paramsId);
  const end = id % 2 === 0;

  return (
    <Fragment>
      <h2 className="my-3 flex justify-between text-xl font-bold">
        {name}
        <AttendeeTag
          className="ml-auto"
          currentAttendee={currentAttendee}
          attendee={attendee}
        />
        {end && <StatusTag end />}
      </h2>
      <div className="flex items-center gap-2 text-sm">
        <EmphasizeBlock>
          {formateDate(startAt)} － {formateDate(endAt)}
        </EmphasizeBlock>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm font-normal">
        <EmphasizeBlock>{startTime}</EmphasizeBlock>
        {featureI.to}
        <EmphasizeBlock>{endTime}</EmphasizeBlock>
      </div>
      <Separator />
      <ServiceInfoBlocks
        attendee={attendee}
        duration={duration}
        supplier={supplier}
        location={location}
      />
      <TextButton onClick={onMoreClick} className="mt-2 text-sm">
        {i.more}
      </TextButton>
      {open && (
        <InfoPrompt
          id={paramsId as string}
          queue={queue}
          title={sharedI.description}
          name={name}
          duration={duration}
          attendee={attendee}
          location={location}
          supplier={supplier}
          description={description}
          onClose={onDescriptionSheetClose}
        />
      )}
    </Fragment>
  );
}
