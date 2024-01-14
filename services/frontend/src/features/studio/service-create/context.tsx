import { createContext, useContext, useState, startTransition } from 'react';
import {
  Step,
  EVENT,
} from '~frontend/features/studio/service-create/constants';
import useSetting from '~frontend/features/studio/hooks/use-setting';
import { eventEmitter } from '~frontend/utils/event';

export type InitialState = {
  currentStep: Step;
  openedExitPrompt: boolean;
  toggleExit: () => void;
  toPreviousStep: () => void;
  toNextStep: () => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  setting: ReturnType<typeof useSetting>['setting'];
};

export const ServiceCreateContext = createContext<InitialState>({
  currentStep: Step.Info,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toPreviousStep: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toNextStep: () => {},
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDisabled: () => {},
  openedExitPrompt: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleExit: () => {},
  setting: null,
});

if (process.env.NODE_ENV !== 'production') {
  ServiceCreateContext.displayName = 'ServiceCreateContext';
}

export const ServiceCreateContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [currentStep, setCurrentStep] = useState(Step.Info);
  const [disabled, setDisabled] = useState(false);
  const [openedExitPrompt, setOpenedExitPrompt] = useState(false);
  const { setting } = useSetting();

  const toPreviousStep = async () => {
    if (currentStep === Step.Detail) {
      eventEmitter.emit(EVENT.info, null);
    }
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const toNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const toggleExit = () =>
    startTransition(() => setOpenedExitPrompt((prev) => !prev));

  return (
    <ServiceCreateContext.Provider
      value={{
        setting,
        currentStep,
        toNextStep,
        toPreviousStep,
        disabled,
        setDisabled,
        openedExitPrompt,
        toggleExit,
      }}
    >
      {children}
    </ServiceCreateContext.Provider>
  );
};

export function useServiceCreateContext() {
  const context = useContext(ServiceCreateContext);
  if (context === undefined) {
    throw new Error(
      'The ServiceCreateContext hook must be used within a ServiceCreateContextProvider.Provider'
    );
  }
  return context;
}
