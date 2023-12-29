import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

export type InitialState = {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const HeaderContext = createContext<InitialState>({
  isMenuOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMenuOpen: () => {},
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

  return (
    <HeaderContext.Provider
      value={{
        isMenuOpen,
        setMenuOpen,
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
