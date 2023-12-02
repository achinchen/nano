import { useParams, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import IconButton from '~frontend/components/IconButton';
import Info from './components/Info';
import ServiceAction from './components/Actions';

const service = {
  name: '創業諮詢',
};

export function OrderDetailHeader() {
  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  return (
    <h2 className="my-0 flex items-center border-b-px border-b-zinc-200 border-b-solid text-xl font-bold">
      <IconButton
        variant="text"
        icon="i-solar-alt-arrow-left-linear"
        color="dark"
        onClick={onBack}
      />
      {service.name}
    </h2>
  );
}

export function OrderDetailContent() {
  const { id } = useParams<{ id?: string }>();
  const end = Number(id) % 2 === 0;

  return (
    <section className="mb-12 mt-4">
      <Info />
      {!end && (
        <Fragment>
          <div className="mx--4 h-2 bg-zinc-200" />
          <ServiceAction />
        </Fragment>
      )}
    </section>
  );
}
