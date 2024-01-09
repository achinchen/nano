import {
  ServiceCreateContextProvider,
  useServiceCreateContext,
} from '~frontend/features/studio/service-create/context';
import Header from '~frontend/features/studio/service-create/Header';
import Detail from '~frontend/features/studio/service-create/Detail';
import InfoForm from '~frontend/features/studio/service-create/InfoForm';
import Preview from '~frontend/features/studio/service-create/Preview';
import ExitPrompt from '~frontend/features/studio/service-create/ExitPrompt';
import { Step } from '~frontend/features/studio/service-create/constants';

function Content() {
  const { currentStep } = useServiceCreateContext();

  return (
    <>
      <Header />
      {currentStep === Step.Info && <InfoForm />}
      {currentStep === Step.Detail && <Detail />}
      {currentStep === Step.Preview && <Preview />}
      <ExitPrompt />
    </>
  );
}

export default function Index() {
  return (
    <ServiceCreateContextProvider>
      <Content />
    </ServiceCreateContextProvider>
  );
}
