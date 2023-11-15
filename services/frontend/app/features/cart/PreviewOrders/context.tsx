import type { ServiceOrder } from '~frontend/features/cart/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { getAll } from '~frontend/features/cart/utils';

type InitialState = {
  services: ServiceOrder[];
  info: { [key: string]: string };
};

export const PreviewOrdersContext = createContext<InitialState>({
  services: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  info: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
});

if (process.env.NODE_ENV !== 'production') {
  PreviewOrdersContext.displayName = 'PreviewOrdersContext';
}

export const PreviewOrdersContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [services, setServices] = useState<ServiceOrder[]>([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const { cart, info } = getAll();
    setServices(cart);
    setInfo(info);
  }, []);

  return (
    <PreviewOrdersContext.Provider
      value={{
        services,
        info,
      }}
    >
      {children}
    </PreviewOrdersContext.Provider>
  );
};

export function usePreviewOrdersContext() {
  const context = useContext(PreviewOrdersContext);
  if (context === undefined) {
    throw new Error(
      'The PreviewOrdersContext hook must be used within a CalendarVerticalContextProvider.Provider'
    );
  }
  return context;
}
