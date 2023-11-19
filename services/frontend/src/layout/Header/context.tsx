import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

export type InitialState = {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isProvider: boolean;
  setIsProvider: Dispatch<SetStateAction<boolean>>;
};

export const HeaderContext = createContext<InitialState>({
  isMenuOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMenuOpen: () => {},
  isLogin: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLogin: () => {},
  isProvider: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsProvider: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  HeaderContext.displayName = 'HeaderMenuContext';
}

export const HeaderContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isProvider, setIsProvider] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        isMenuOpen,
        setMenuOpen,
        isLogin,
        setIsLogin,
        isProvider,
        setIsProvider,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export function useHeaderContext() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error(
      'The HeaderContext hook must be used within a HeaderMenuContextProvider.Provider'
    );
  }
  return context;
}
