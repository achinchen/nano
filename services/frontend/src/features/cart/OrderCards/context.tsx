import type { ServiceOrder } from '~frontend/features/cart/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { EVENT } from '~frontend/features/cart/context';
import { eventEmitter } from '~frontend/utils/event';
import { setCart } from '~frontend/features/cart/utils';
import { SERVICE } from '~frontend/shared/mock';
import { isExpiredServices } from './utils';

const mockServices = [
  {
    ...SERVICE.IN_PROGRESS[0],
    times: [
      '2024-01-29T09:20:00',
      '2024-01-12T10:00:00',
      '2024-01-29T10:00:00',
    ],
  },
] as unknown as ServiceOrder[];

type InitialState = {
  services: ServiceOrder[];
  onRemove: (id: ServiceOrder['id']) => void;
  onUpdate: (service: ServiceOrder) => void;
};

export const OrderCardsContext = createContext<InitialState>({
  services: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  onRemove: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function,
  onUpdate: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  OrderCardsContext.displayName = 'OrderCardsContext';
}

export const OrderCardsContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [services, setServices] = useState<ServiceOrder[]>(
    mockServices.map((service) => ({
      ...service,
      expired: isExpiredServices(service.times),
    }))
  );

  const onRemove = (targetId: ServiceOrder['serviceId']) => {
    setServices((services) =>
      services.filter(({ serviceId }) => serviceId !== targetId)
    );
  };

  const onUpdate = (service: ServiceOrder) => {
    setServices((services) => {
      const index = services.findIndex(
        ({ serviceId }) => serviceId === service.serviceId
      );
      if (index === -1) return services;
      services[index] = service;
      return [...services];
    });
  };

  useEffect(() => {
    const cb = () => {
      setCart(services.filter(({ expired }) => !expired));
    };

    eventEmitter.subscribe(EVENT.order, cb);
    return eventEmitter.unsubscribe(EVENT.order, cb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrderCardsContext.Provider
      value={{
        services,
        onUpdate,
        onRemove,
      }}
    >
      {children}
    </OrderCardsContext.Provider>
  );
};

export function useOrderCardsContext() {
  const context = useContext(OrderCardsContext);
  if (context === undefined) {
    throw new Error(
      'The OrderCardsContext hook must be used within a OrderCardsContext.Provider'
    );
  }
  return context;
}
