import { Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceDetail from '~frontend/features/studio/components/ServiceDetailMore';
import featureI from '~frontend/features/studio/i.json';
import StatusTag from '~frontend/features/studio/components/StatusTag';
import { getPeriodTimes } from '~frontend/utils/time';
import Separator from '~frontend/components/Separator';
import { formateDate } from '~frontend/utils/date';
import EmphasizeBlock from '~frontend/shared/components/EmphasizeBlock';
import ServiceInfoBlocks from '~frontend/shared/components/InfoBlocks';
import Button from '~frontend/components/Button';
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
  id: '1',
  queue: true,
};

const { startAt, endAt, name, supplier, duration, location, attendee } =
  service;

const [startTime, endTime] = getPeriodTimes(startAt, duration);

function Footer({ target }: { target: string }) {
  const navigate = useNavigate();

  const onClick = () => navigate(target);
  return (
    <Button className="w-full" onClick={onClick}>
      {i.button}
    </Button>
  );
}

export default function ServiceInfo() {
  const { id } = useParams<{ id?: string }>();
  const targetPath = `/studio/services/${id}`;

  return (
    <Fragment>
      <h2 className="my-3 flex justify-between text-xl font-bold">
        {name}
        <StatusTag end={Number(id) % 2 === 0} />
      </h2>
      <div className="flex items-center gap-2 text-sm">
        <EmphasizeBlock>
          {formateDate(startAt)} － {formateDate(endAt)}
        </EmphasizeBlock>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <EmphasizeBlock>{startTime}</EmphasizeBlock>
        {featureI.to}
        <EmphasizeBlock>{endTime}</EmphasizeBlock>
      </div>
      <Separator />
      <ServiceInfoBlocks
        attendee={attendee}
        duration={duration}
        location={location}
        supplier={supplier}
      />
      <ServiceDetail
        className="mt-1"
        service={{
          ...service,
          queue: Number(id) % 2 === 0,
        }}
        footer={<Footer target={targetPath} />}
      />
    </Fragment>
  );
}
