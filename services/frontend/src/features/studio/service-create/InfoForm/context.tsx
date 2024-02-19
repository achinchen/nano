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

const mockForm = {
  name: '塔羅預約',
  supplierId: 1,
  locationId: 1,
  description: `
  🔮 洞悉未來之旅 🔮
【簡介】 
歡迎蒞臨我們的塔羅預約！在這場神秘的旅程中，您將探索塔羅牌背後的奧秘與智慧。我們將引領您進入塔羅牌的世界。
事業 🌕 感情 🌖 財富 🌔 心靈成長
安老師將為您提供精準的解讀和個人化的指引，助您找到生活中的方向和平衡，啟動您的內在探索之旅！

【服務費用】
45 分鐘：800元 - 請至 45 分課程頁面中預約
60 分鐘：1000元 - 請至 60 分課程頁面中預約
90 分鐘：1200元
付款方式：在預約確認後，我們將提供您專屬的付款帳號。請務必於收到付款帳號後的三天內完成付款程序，以確保您的訂單有效。逾期未完成付款者，將取消訂單。

【預約限制】
預約限制：每日名額有限，請盡早預約確保您的位置。
人數限制：由於空間有限及隱私，不建議攜伴超過三人。若有特殊需求，請提前告知。
為維護空間整潔及環境品質，請勿在教室內進食。

【課程提醒】 
這是一場個人尋找心靈指引的旅程。請確認您已了解上課地點的詳細地址和相關交通資訊，提前安排好您的交通方式，以確保準時抵達上課地點。
`,
  attendee: 1,
  duration: 45,
  allday: true,
  startAt: '2024-01-01',
  startTime: '',
  endAt: '2024-12-31',
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
  const [form, dispatch] = useReducer(formReducer, { ...mockForm });
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
