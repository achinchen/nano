import {
  createContext,
  useContext,
  useState,
  useReducer,
  useMemo,
  useEffect,
} from 'react';
import { getAfter } from '~frontend/utils/date';
import {
  setInfo,
  getInfo,
} from '~frontend/features/studio/service-create/utils';
import { InfoStep } from './constants';

type Field = keyof typeof defaultForm;
type Form = typeof defaultForm;
type ErrorMessage = { [key in Field]: string };

const defaultForm = {
  name: '',
  supplierId: -1,
  locationId: -1,
  description: '',
  attendee: 1,
  duration: 0,
  allday: true,
  startAt: new Date().toISOString().slice(0, 10),
  startTime: '',
  endAt: getAfter(new Date(), 1, 'day').toISOString().slice(0, 10),
  endTime: '',
  queue: true,
};

const defaultError = Object.keys(defaultForm).reduce((acc, key) => {
  return { ...acc, [key]: '' };
}, {}) as ErrorMessage;

const formReducer = (state: Form, newState: Partial<Form>) => {
  return { ...state, ...newState };
};

const errorMessageReducer = (
  state: ErrorMessage,
  newState: Partial<ErrorMessage>
) => {
  return { ...state, ...newState };
};

type InitialState = {
  form: Form;
  errors: ErrorMessage;
  step: InfoStep;
  onNext: () => void;
  onPrevious: () => void;
  disabled: boolean;
  dispatch: React.Dispatch<Partial<Form>>;
  dispatchError: React.Dispatch<Partial<ErrorMessage>>;
  setEmpty: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ServiceCreateInfoFormContext = createContext<InitialState>({
  form: defaultForm,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  dispatch: () => {},
  errors: defaultError,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  dispatchError: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  step: InfoStep.Name,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  onNext: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  onPrevious: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  disabled: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  setEmpty: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  ServiceCreateInfoFormContext.displayName = 'ServiceCreateInfoFormContext';
}

export const ServiceCreateInfoFormContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [form, dispatch] = useReducer(formReducer, { ...defaultForm });
  const [empty, setEmpty] = useState(false);
  const [errors, dispatchError] = useReducer(errorMessageReducer, {
    ...defaultError,
  });

  const disabled = useMemo(
    () => Object.values(errors).some(Boolean) || empty,
    [errors, empty]
  );

  const [step, setStep] = useState(InfoStep.Name);

  const onNext = () => setStep((step) => step + 1);
  const onPrevious = () => setStep((step) => step - 1);

  useEffect(() => {
    if (step !== InfoStep.Queue) return;
    setInfo(form);
    setEmpty(false);
  }, [step, form]);

  useEffect(() => {
    const infoForm = getInfo();
    if (!infoForm) return;
    dispatch(infoForm);
    setStep(InfoStep.Queue);
  }, [dispatch]);

  return (
    <ServiceCreateInfoFormContext.Provider
      value={{
        step,
        onNext,
        onPrevious,
        disabled,
        form,
        errors,
        dispatch,
        dispatchError,
        setEmpty,
      }}
    >
      {children}
    </ServiceCreateInfoFormContext.Provider>
  );
};

export function useServiceCreateInfoFormContext() {
  const context = useContext(ServiceCreateInfoFormContext);
  if (context === undefined) {
    throw new Error(
      'The ServiceCreateInfoFormContext hook must be used within a ServiceCreateInfoFormContext.Provider'
    );
  }
  return context;
}
