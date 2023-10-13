import type { Dispatch, SetStateAction } from 'react';
import type { ServiceTimesProps } from './type';
import { createContext, useContext, useState } from 'react';

type InitialState = {
  times: ServiceTimesProps['times'] | [];
  queue: ServiceTimesProps['queue'];
  queues: string[];
  setQueues: Dispatch<SetStateAction<string[]>>;
};

export const ServiceTimesContext = createContext<InitialState>({
  times: [],
  queue: true,
  queues: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setQueues: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  ServiceTimesContext.displayName = 'ServiceTimesContext';
}

export const ServiceTimesContextProvider = ({
  times,
  queue,
  children,
}: {
  children: JSX.Element;
  times: InitialState['times'];
  queue: InitialState['queue'];
}) => {
  const [queues, setQueues] = useState<InitialState['queues']>([]);

  return (
    <ServiceTimesContext.Provider
      value={{
        times,
        queue,
        setQueues,
        queues,
      }}
    >
      {children}
    </ServiceTimesContext.Provider>
  );
};

export function useServiceTimesContext() {
  const context = useContext(ServiceTimesContext);
  if (context === undefined) {
    throw new Error(
      'The ServiceTimesContext hook must be used within a ServiceTimesContextProvider.Provider'
    );
  }
  return context;
}
