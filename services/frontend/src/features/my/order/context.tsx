import { createContext, useContext, useState } from 'react';

export type InitialState = {
  visitedAt: Date;
};

export const MyOrderContext = createContext<InitialState>({
  visitedAt: new Date('2024/01/01'),
});

if (process.env.NODE_ENV !== 'production') {
  MyOrderContext.displayName = 'MyOrderContext';
}

export const MyOrderContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [visitedAt] = useState(new Date('2023-12-25'));

  return (
    <MyOrderContext.Provider
      value={{
        visitedAt,
      }}
    >
      {children}
    </MyOrderContext.Provider>
  );
};

export function useMyOrderContext() {
  const context = useContext(MyOrderContext);
  if (context === undefined) {
    throw new Error(
      'The MyOrderContext hook must be used within a MyOrderContextProvider.Provider'
    );
  }
  return context;
}
