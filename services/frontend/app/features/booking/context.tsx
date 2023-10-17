import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

type InitialState = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
};

export const BookingContext = createContext<InitialState>({
  selectedDate: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDate: () => {},
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

  return (
    <BookingContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
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
