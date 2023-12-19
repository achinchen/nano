import { createContext, useContext, useState } from 'react';

type Mode = 'week' | 'month';

type InitialState = {
  mode: Mode;
  toggleMode: () => void;
};

export const CalendarModeSwitchableContext = createContext<InitialState>({
  mode: 'week',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleMode: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  CalendarModeSwitchableContext.displayName = 'CalendarModeSwitchableContext';
}

export const CalendarModeSwitchableContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [mode, setMode] = useState<Mode>('week');

  const toggleMode = () => {
    setMode((mode) => (mode === 'month' ? 'week' : 'month'));
  };

  return (
    <CalendarModeSwitchableContext.Provider
      value={{
        mode,
        toggleMode,
      }}
    >
      {children}
    </CalendarModeSwitchableContext.Provider>
  );
};

export function useCalendarModeSwitchableContext() {
  const context = useContext(CalendarModeSwitchableContext);
  if (context === undefined) {
    throw new Error(
      'The CalendarModeSwitchableContext hook must be used within a CalendarModeSwitchableContextProvider.Provider'
    );
  }
  return context;
}
