import { createContext, useContext, useState } from 'react';

type Mode = 'week' | 'month';

type InitialState = {
  mode: Mode;
  toggleMode: () => void;
};

export const CalendarVerticalContext = createContext<InitialState>({
  mode: 'week',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleMode: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  CalendarVerticalContext.displayName = 'CalendarVerticalContext';
}

export const CalendarVerticalContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [mode, setMode] = useState<Mode>('week');

  const toggleMode = () => {
    setMode((mode) => (mode === 'month' ? 'week' : 'month'));
  };

  return (
    <CalendarVerticalContext.Provider
      value={{
        mode,
        toggleMode,
      }}
    >
      {children}
    </CalendarVerticalContext.Provider>
  );
};

export function useCalendarVerticalContext() {
  const context = useContext(CalendarVerticalContext);
  if (context === undefined) {
    throw new Error(
      'The CalendarVerticalContext hook must be used within a CalendarVerticalContextProvider.Provider'
    );
  }
  return context;
}
