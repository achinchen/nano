import { Fragment } from 'react';
import StepProgress from '~frontend/components/StepProgress';
import featureI from '~frontend/features/studio/service-create/i.json';
import {
  Step,
  STEP_LENGTHS,
} from '~frontend/features/studio/service-create/constants';
import Footer from './components/Footer';
import { InfoStep, STEPS, INFO_STEP_LENGTHS } from './constants';
import scopedI from './i.json';
import StepName from './components/StepName';
import StepDescription from './components/StepDescription';
import StepDetail from './components/StepDetail';
import StepTime from './components/StepTime';
import StepQueue from './components/StepQueue';
import { isEmpty } from './utils';
import {
  ServiceCreateInfoFormContextProvider,
  useServiceCreateInfoFormContext,
} from './context';

const CURRENT_STEP = Step.Info + 1;

function InfoForm() {
  const { step, dispatchError } = useServiceCreateInfoFormContext();

  const checkRequired = (key: string, value: string) => {
    dispatchError({ [key]: isEmpty(value) ? scopedI.required : '' });
  };

  return (
    <Fragment>
      <main className="max-h-[calc(100dvh-180px)] overflow-y-scroll bg-white pa-2 md:h-[calc(100dvh-180px)]">
        <section className="mx-4 my-2 max-w-4xl flex-1 md:mx-auto md:mb-4">
          <header className="mb-6 mt-3 flex flex-col items-center">
            <StepProgress
              steps={STEP_LENGTHS}
              currentStep={CURRENT_STEP}
              value={(step / INFO_STEP_LENGTHS) * 10}
            />
            <div className="self-start text-base">
              <span>
                {featureI.step} {CURRENT_STEP}
              </span>
              <h3 className="text-2xl">{STEPS[step].label}</h3>
              {STEPS[step].content && (
                <p className="ma-0 font-normal">{STEPS[step].content}</p>
              )}
            </div>
          </header>
          <div className="mb-6 flex flex-col gap-2">
            {step === InfoStep.Name && (
              <StepName checkRequired={checkRequired} />
            )}
            {step === InfoStep.Description && (
              <StepDescription checkRequired={checkRequired} />
            )}
            {step === InfoStep.Detail && <StepDetail />}
            {step === InfoStep.Time && <StepTime />}
            {step === InfoStep.Queue && <StepQueue />}
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default function InfoFormWithProvider() {
  return (
    <ServiceCreateInfoFormContextProvider>
      <InfoForm />
    </ServiceCreateInfoFormContextProvider>
  );
}
