import type { ServiceOrder } from '~frontend/features/cart/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { EVENT } from '~frontend/features/cart/context';
import { eventEmitter } from '~frontend/utils/event';
import { setCart } from '~frontend/features/cart/utils';
import { isExpiredServices } from './utils';

const mockServices = [
  {
    id: 44,
    attendee: 2,
    duration: 40,
    name: '小飛象戚風蛋糕',
    address: '台北',
    supplier: '阿狗狗',
    queue: true,
    times: ['2023-12-19T13:00', '2023-12-17T15:00', '2023-12-15T18:00'],
  },
  {
    id: 45,
    attendee: 2,
    duration: 90,
    name: '小飛象戚風蛋糕',
    address: '台北',
    supplier: '阿狗狗',
    queue: false,
    times: ['2023-12-19T13:00'],
  },
  {
    id: 48,
    attendee: 2,
    duration: 45,
    name: '小飛象戚風蛋糕',
    address: '台北',
    supplier: '阿狗狗',
    queue: false,
    times: ['2023-10-12T01:00'],
  },
] as ServiceOrder[];

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

  const onRemove = (targetId: ServiceOrder['id']) => {
    setServices((services) => services.filter(({ id }) => id !== targetId));
  };

  const onUpdate = (service: ServiceOrder) => {
    setServices((services) => {
      const index = services.findIndex(({ id }) => id === service.id);
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
