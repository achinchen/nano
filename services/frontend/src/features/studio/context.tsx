import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';
import { eventEmitter } from '~frontend/utils/event';

export type InitialState = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  isToday: boolean;
  isListMode: boolean;
  setListMode: Dispatch<SetStateAction<boolean>>;
};

export const EVENT_NAME = 'studio-date-change';

function getIsToday(selectedDate: Date) {
  const today = new Date();
  const isToday =
    today.getFullYear() === selectedDate.getFullYear() &&
    today.getMonth() === selectedDate.getMonth() &&
    today.getDate() === selectedDate.getDate();

  return isToday;
}

export const StudioContext = createContext<InitialState>({
  selectedDate: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDate: () => {},
  isToday: false,
  isListMode: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setListMode: () => {},
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
        setListMode,
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
