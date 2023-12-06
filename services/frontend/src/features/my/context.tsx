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
  visitedAt: Date;
};

export const MyContext = createContext<InitialState>({
  selectedDate: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDate: () => {},
  visitedAt: new Date(),
});

if (process.env.NODE_ENV !== 'production') {
  MyContext.displayName = 'MyContext';
}

export const MyContextProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visitedAt] = useState(new Date('2023-12-18'));

  return (
    <MyContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        visitedAt,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error(
      'The MyContext hook must be used within a MyContextProvider.Provider'
    );
  }
  return context;
}
