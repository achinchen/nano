import { Fragment, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { MyContextProvider, useMyContext } from '~frontend/features/my/context';
import CalendarHorizontal from '~frontend/features/my/CalendarHorizontal';
import OrderDetail from '~frontend/features/my/OrderDetail';
import OrderDetailFooter from '~frontend/features/my/OrderDetailFooter';
import Header from '~frontend/features/my/Header';

const CONTAINER_CLASS = {
  default: 'max-h-[calc(100dvh-56px)] md:max-h-[calc(100dvh-108px)]',
  end: 'max-h-[calc(100dvh-116px)] md:max-h-[calc(100dvh-168px)]',
};

function Content() {
  const { setSelectedDate } = useMyContext();
  const [searchParams] = useSearchParams();

  const { id } = useParams<{ id: string }>();

  const end = id !== '21';

  useEffect(() => {
    const date = searchParams.get('date');
    if (!date) return;
  }, [setSelectedDate, searchParams]);

  return (
    <div className="flex flex-col md:flex-row md:bg-white">
      <section className="hidden md:block">
        <CalendarHorizontal />
      </section>
      <section className="mb-4 md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
        <section
          className={`flex-1 overflow-y-scroll mb-4 pa-4 ${
            end ? CONTAINER_CLASS.end : CONTAINER_CLASS.default
          }`}
        >
          <OrderDetail />
        </section>
        {end && <OrderDetailFooter />}
      </section>
    </div>
  );
}

export default function Index() {
  return (
    <MyContextProvider>
      <Fragment>
        <Header smHidden />
        <Content />
      </Fragment>
    </MyContextProvider>
  );
}
