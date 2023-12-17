import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type InitialState = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
};

export const AppContext = createContext<InitialState>({
  selectedDate: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDate: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  AppContext.displayName = 'AppContext';
}

export const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <AppContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      'The AppContext hook must be used within a AppContextProvider.Provider'
    );
  }
  return context;
}
