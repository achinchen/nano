import { Fragment, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MyContextProvider, useMyContext } from '~frontend/features/my/context';
import CalendarHorizontal from '~frontend/features/my/CalendarHorizontal';
import Orders from '~frontend/features/my/Orders';
import Header from '~frontend/features/my/OrderHeader';

function Content() {
  const { setSelectedDate } = useMyContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const date = searchParams.get('date');
    if (!date) return;
  }, [setSelectedDate, searchParams]);

  return (
    <div className="flex flex-col md:flex-row md:bg-white">
      <section className="hidden md:block">
        <CalendarHorizontal />
      </section>
      <section className="max-h-[calc(100dvh-112px)] flex-1 overflow-y-scroll pa-4 md:max-h-[calc(100dvh-108px)] md:border-l-1 md:border-l-zinc-200 md:border-l-solid">
        <Orders />
      </section>
    </div>
  );
}

export default function Index() {
  return (
    <MyContextProvider>
      <Fragment>
        <Header />
        <Content />
      </Fragment>
    </MyContextProvider>
  );
}
