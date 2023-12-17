import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Detail, { Footer } from '~frontend/features/my/order/OrderDetail';

const CONTAINER_CLASS = {
  default: 'max-h-[calc(100dvh-56px)] md:max-h-[calc(100dvh-108px)]',
  end: 'max-h-[calc(100dvh-118px)] md:max-h-[calc(100dvh-172px)]',
};

export default function Index() {
  const { id } = useParams<{ id: string }>();

  const end = id === '21';

  return (
    <Fragment>
      <section
        className={`overflow-y-scroll px-4 pt-4 pb-8 ${
          end ? CONTAINER_CLASS.end : CONTAINER_CLASS.default
        }`}
      >
        <Detail />
      </section>
      {end && <Footer />}
    </Fragment>
  );
}
