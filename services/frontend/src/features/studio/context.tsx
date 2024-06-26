import {
  startTransition,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';
import { eventEmitter } from '~frontend/utils/event';
import { isToday as getIsToday } from '~frontend/utils/date';

export type InitialState = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  isToday: boolean;
  isListMode: boolean;
  toggleListMode: () => void;
};

export const EVENT_NAME = 'studio-date-change';

export const StudioContext = createContext<InitialState>({
  selectedDate: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDate: () => {},
  isToday: false,
  isListMode: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleListMode: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  StudioContext.displayName = 'StudioContext';
}

export const StudioContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isListMode, setListMode] = useState(false);

  const toggleListMode = () =>
    startTransition(() => setListMode((isListMode) => !isListMode));

  const isToday = useMemo(() => getIsToday(selectedDate), [selectedDate]);

  const setSelectedDateWithEvent = (date: SetStateAction<Date>) => {
    setSelectedDate(date);
    eventEmitter.emit(EVENT_NAME, null);
  };

  return (
    <StudioContext.Provider
      value={{
        isToday,
        selectedDate,
        setSelectedDate: setSelectedDateWithEvent,
        isListMode,
        toggleListMode,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export function useStudioContext() {
  const context = useContext(StudioContext);
  if (context === undefined) {
    throw new Error(
      'The StudioContext hook must be used within a StudioContextProvider.Provider'
    );
  }
  return context;
}
