import type { Value, ContextState } from '../types';
import { createContext, useContext, useState } from 'react';

type InitialState = ContextState;

export const TabsContext = createContext<InitialState>({
  defaultValue: null,
  current: null,
  setCurrent: () => {
    /* */
  },
  onChange: () => {
    /* */
  },
});

if (process.env.NODE_ENV !== 'production') {
  TabsContext.displayName = 'TabsContext';
}

export const TabsContextProvider = ({
  children,
  defaultValue = null,
  onChange,
}: {
  defaultValue?: Value;
  children: JSX.Element;
  onChange: ContextState['onChange'];
}) => {
  const [current, setCurrent] = useState<Value>(defaultValue);

  return (
    <TabsContext.Provider
      value={{
        current,
        setCurrent,
        defaultValue,
        onChange,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error(
      'The TabsContext hook must be used within a NotificationsContextProvider.Provider'
    );
  }
  return context;
}
