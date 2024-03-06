import type { Service } from '~frontend/features/booking/types';
import { useParams } from 'react-router-dom';
import { Fragment, lazy, useMemo } from 'react';
import { SERVICES } from '~frontend/shared/mock';
import { useAppContext } from '~frontend/context';
import Header from '~frontend/features/booking/components/Header';
import Footer from '~frontend/features/booking/detail/components/Footer';
import {
  getServiceWithStatus,
  getOrders,
} from '~frontend/features/booking/utils';
import ServiceDetail from './components/ServiceDetail';
import ServiceTimes from './components/ServiceTimes';

const Calendar = lazy(
  () => import('~frontend/features/booking/components/Calendar')
);

export default function Detail() {
  const { id } = useParams<{ id?: string }>();
  const { selectedDate } = useAppContext();
  const service = useMemo(() => {
    const result = SERVICES.find(({ serviceId }) => serviceId === Number(id));
    if (!result) return null;
    return getServiceWithStatus(result as unknown as Service, selectedDate);
  }, [selectedDate, id]);

  if (!service) return null;

  return (
    <Fragment>
      <Header smHidden />
      <div className="flex flex-col md:h-[calc(100dvh-180px)]">
        <main className="relative flex bg-white">
          <Calendar className="hidden md:block" />
          <section className="max-h-[calc(100dvh-120px)] flex-1 overflow-y-scroll overflow-y-scroll bg-white px-4 py-2 md:max-h-full">
            <ServiceDetail {...(service as unknown as Service)} />
            <ServiceTimes
              queue={service.queue}
              duration={service.duration}
              allday={service.allday}
              startAt={service.startAt}
              endAt={service.endAt}
              orders={
                getOrders(service.serviceId, selectedDate) as unknown as {
                  startAt: string;
                  currentAttendee: number;
                }[]
              }
              attendee={service.attendee}
            />
          </section>
        </main>
        <Footer disabled={false} />
      </div>
    </Fragment>
  );
}
