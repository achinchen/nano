import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';
import useMe from './hooks/use-me';

export type InitialState = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  isEmptyCart: boolean;
  setIsEmptyCart: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
  isProvider: boolean;
  id: number;
  studio?: {
    avatarUrl: string;
    name: string;
    SNSId: string;
  };
};

export const AppContext = createContext<InitialState>({
  selectedDate: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDate: () => {},
  isEmptyCart: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsEmptyCart: () => {},
  isLogin: false,
  isProvider: false,
  id: 0,
  studio: undefined,
});

if (process.env.NODE_ENV !== 'production') {
  AppContext.displayName = 'AppContext';
}

export const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedDate, setSelectedDate] = useState(new Date('2024/01/01'));
  const [isEmptyCart, setIsEmptyCart] = useState(true);
  const { me } = useMe();
  const isLogin = Boolean(me) && Number(me?.role) !== 0;
  const isProvider = Number(me?.role) === 2;
  const id = me?.id ? Number(me.id) : 0;
  const studio = me?.studio;

  return (
    <AppContext.Provider
      value={{
        isEmptyCart,
        setIsEmptyCart,
        selectedDate,
        setSelectedDate,
        id,
        isLogin,
        isProvider,
        studio,
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
