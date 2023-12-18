import { useParams } from 'react-router-dom';
import { Fragment } from 'react';
import Info from './components/Info';
import ServiceAction from './components/Actions';

export default function Content() {
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
