import type dayjs from 'dayjs';
import type { Mode } from '~frontend/components/Calendar/type';
import { createContext, useContext, useState } from 'react';
import { getToday } from '~frontend/components/Calendar/utils';
import { MODES } from '~frontend/components/Calendar/constants';

export type InitialState = {
  today: dayjs.Dayjs;
  updateToday: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  mode: Mode;
  updateMode: React.Dispatch<React.SetStateAction<Mode>>;
  selectedDate: dayjs.Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

const INITIAL_TODAY = getToday();
const DEFAULT_MODE = MODES[1];

export const CalendarContext = createContext<InitialState>({
  today: INITIAL_TODAY,
  updateToday: () => {
    throw new Error('updateToday was not initialized');
  },
  mode: DEFAULT_MODE,
  updateMode: () => {
    throw new Error('updateMode was not initialized');
  },
  selectedDate: INITIAL_TODAY,
  setSelectedDate: () => {
    throw new Error('setSelectedDate was not initialized');
  },
});

CalendarContext.displayName = 'CalendarContext';

export const CalendarContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [today, updateToday] = useState<InitialState['today']>(INITIAL_TODAY);
  const [selectedDate, setSelectedDate] =
    useState<InitialState['today']>(INITIAL_TODAY);
  const [mode, updateMode] = useState<Mode>(DEFAULT_MODE);

  return (
    <CalendarContext.Provider
      value={{
        today,
        updateToday,
        selectedDate,
        setSelectedDate,
        mode,
        updateMode,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error(
      'The CalendarContext hook must be used within a CalendarContextProvider.Provider'
    );
  }
  return context;
}
