import { Fragment, useMemo } from 'react';
import StepProgress from '~frontend/components/StepProgress';
import ServiceInfo from '~frontend/features/studio/components/ServiceInfo';
import OrderFields from '~frontend/features/studio/components/OrderFields';
import featureI from '~frontend/features/studio/service-create/i.json';
import {
  Step,
  STEP_LENGTHS,
} from '~frontend/features/studio/service-create/constants';
import { getInfo } from '~frontend/features/studio/service-create/utils';
import { useServiceCreateContext } from '~frontend/features/studio/service-create/context';
import { getStartAtAndEndAt } from './utils';
import Footer from './components/Footer';
import i from './i.json';

const CURRENT_STEP = Step.Preview + 1;
const CURRENT_PROGRESS_VALUE = 10;

export default function Preview() {
  const { setting } = useServiceCreateContext();

  const service = useMemo(() => {
    const service = getInfo();
    return {
      ...service,
      ...getStartAtAndEndAt({
        startAt: service.startAt,
        endAt: service.endAt,
        startTime: service.startTime,
        endTime: service.endTime,
        allday: service.allday,
        studioOpenAt: setting?.openAt as Date,
        studioOpenDuration: setting?.openDuration as number,
      }),
      id: 0,
      supplier: setting?.suppliers?.find(
        (supplier) => service.supplierId === supplier.id
      )?.name,
      location: setting?.location,
    };
  }, [setting]);

  return (
    <Fragment>
      <main className="max-h-[calc(100dvh-180px)] bg-white pa-2 md:h-[calc(100dvh-180px)]">
        <section className="mx-4 my-2 max-w-4xl flex-1 md:mx-auto md:mb-4">
          <header className="mb-6 mt-3 flex flex-col items-center">
            <StepProgress
              steps={STEP_LENGTHS}
              currentStep={Step.Preview}
              value={CURRENT_PROGRESS_VALUE}
            />
            <div className="self-start text-base">
              <span>
                {featureI.step} {CURRENT_STEP}
              </span>
              <h3 className="text-2xl">{i.label}</h3>
            </div>
          </header>
          <div className="mb-6 max-h-[calc(100dvh-356px)] flex flex-col gap-4 overflow-y-scroll border-1px border-zinc-200 rounded-4 border-solid bg-white pa-2 px-4 py-2 font-normal md:h-[calc(100dvh-356px)]">
            <ServiceInfo {...service} />
            <OrderFields queue={service.queue} />
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
