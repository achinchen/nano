import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';
import { eventEmitter } from '~frontend/utils/event';

type InitialState = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  isToday: boolean;
};

export const EVENT_NAME = 'booking-date-change';

function getIsToday(selectedDate: Date) {
  const today = new Date();
  const isToday =
    today.getFullYear() === selectedDate.getFullYear() &&
    today.getMonth() === selectedDate.getMonth() &&
    today.getDate() === selectedDate.getDate();

  return isToday;
}

export const BookingContext = createContext<InitialState>({
  selectedDate: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDate: () => {},
  isToday: false,
});

if (process.env.NODE_ENV !== 'production') {
  BookingContext.displayName = 'BookingContext';
}

export const BookingContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isToday = useMemo(() => getIsToday(selectedDate), [selectedDate]);

  const setSelectedDateWithEvent = (date: SetStateAction<Date>) => {
    setSelectedDate(date);
    eventEmitter.emit(EVENT_NAME, null);
  };

  return (
    <BookingContext.Provider
      value={{
        isToday,
        selectedDate,
        setSelectedDate: setSelectedDateWithEvent,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export function useBookingContext() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error(
      'The BookingContext hook must be used within a BookingContextProvider.Provider'
    );
  }
  return context;
}
