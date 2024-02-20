import { Fragment, useMemo } from 'react';
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
import { SERVICES } from '~frontend/features/studio/mock';
import { isEndService } from '~frontend/features/studio/utils';
import i from './i.json';

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
  const service = useMemo(
    () => SERVICES.find(({ serviceId }) => serviceId === Number(id)),
    [id]
  );

  if (!service) return null;

  const { startAt, endAt, name, supplier, duration, location, attendee } =
    service;
  const [startTime, endTime] = getPeriodTimes(startAt, duration);
  const targetPath = `/studio/services/${id}`;

  return (
    <Fragment>
      <h2 className="my-3 flex justify-between text-xl font-bold">
        {name}
        <StatusTag end={isEndService(endAt)} />
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
          id: Number(id),
        }}
        footer={<Footer target={targetPath} />}
      />
    </Fragment>
  );
}
