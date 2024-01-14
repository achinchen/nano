import { Fragment } from 'react';
import StepProgress from '~frontend/components/StepProgress';
import sharedI from '~frontend/shared/i.json';
import featureI from '~frontend/features/studio/service-create/i.json';
import {
  Step,
  STEP_LENGTHS,
} from '~frontend/features/studio/service-create/constants';
import { useServiceCreateContext } from '~frontend/features/studio/service-create/context';
import Footer from './components/Footer';
import i from './i.json';

const CURRENT_STEP = Step.Detail + 1;

function Label({ children }: { children: string }) {
  return (
    <div className="flex justify-between">
      {children}
      <span className="font-medium color-primary-500">{i.required}</span>
    </div>
  );
}

export default function Detail() {
  const { toPreviousStep, toNextStep } = useServiceCreateContext();

  return (
    <Fragment>
      <main className="max-h-[calc(100dvh-180px)] overflow-y-scroll bg-white pa-2 md:h-[calc(100dvh-180px)]">
        <section className="mx-4 my-2 max-w-4xl flex-1 md:mx-auto md:mb-4">
          <header className="mb-6 mt-3 flex flex-col items-center">
            <StepProgress steps={STEP_LENGTHS} currentStep={CURRENT_STEP} />
            <div className="self-start text-base">
              <span>
                {featureI.step} {CURRENT_STEP}
              </span>
              <h3 className="text-2xl">{i.label}</h3>
              <p className="ma-0 font-normal">{i.content}</p>
            </div>
          </header>
          <div className="mb-6 flex flex-col gap-4 font-normal">
            <Label>{sharedI.info.field.name}</Label>
            <Label>{sharedI.info.field.email}</Label>
            <Label>{sharedI.info.field.SNSId}</Label>
            <Label>{sharedI.info.field.phone}</Label>
          </div>
        </section>
      </main>
      <Footer onPrevious={toPreviousStep} onNext={toNextStep} />
    </Fragment>
  );
}
