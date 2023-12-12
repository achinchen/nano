import { createContext, useContext, useState } from 'react';

type View = 'studio' | 'supplier';

export type InitialState = {
  view: View;
  toggleView: () => void;
};

export const StudioSettingContext = createContext<InitialState>({
  view: 'studio',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleView: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  StudioSettingContext.displayName = 'StudioSettingContext';
}

export const StudioSettingContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [view, setView] = useState('studio');
  const toggleView = () =>
    setView((prev) => (prev === 'studio' ? 'supplier' : 'studio'));

  return (
    <StudioSettingContext.Provider
      value={{
        view,
        toggleView,
      }}
    >
      {children}
    </StudioSettingContext.Provider>
  );
};

export function useStudioSettingContext() {
  const context = useContext(StudioSettingContext);
  if (context === undefined) {
    throw new Error(
      'The StudioSettingContext hook must be used within a StudioSettingContextProvider.Provider'
    );
  }
  return context;
}
