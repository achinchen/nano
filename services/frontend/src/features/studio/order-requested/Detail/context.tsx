import type {
  RequestedOrder,
  OrderDetail,
} from '~frontend/features/studio/types';
import { useParams } from 'react-router-dom';
import { createContext, useContext, useMemo, useState } from 'react';
import { ORDER } from '~frontend/shared/mock';

type ContactInfo = Pick<
  OrderDetail,
  'name' | 'SNSId' | 'email' | 'phone' | 'comment' | 'userId'
>;

type Time = string;

type Queue = {
  currentAttendee: number;
  startAt: Time;
  disabled: boolean;
  reason?: string;
};

type Requirement = {
  attendee: number;
  queues: Queue[];
};

export type InitialState = {
  service?: RequestedOrder['service'];
  contactInfo?: ContactInfo;
  requirement?: Requirement;
  selectedTime: Time | undefined;
  setSelectedTime: React.Dispatch<React.SetStateAction<Time | undefined>>;
};

export const RequestOrderContext = createContext<InitialState>({
  service: {} as RequestedOrder['service'],
  contactInfo: {} as ContactInfo,
  requirement: {} as Requirement,
  selectedTime: undefined,
  setSelectedTime: () => {
    /** */
  },
});

if (process.env.NODE_ENV !== 'production') {
  RequestOrderContext.displayName = 'RequestOrderContext';
}

export const RequestOrderContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [selectedTime, setSelectedTime] = useState<Time>();
  const { id } = useParams<{ id: string }>();

  const order = useMemo(
    () => ORDER.REQUESTED.find(({ id: orderId }) => orderId === Number(id)),
    [id]
  );

  const service = order?.service as RequestedOrder['service'];
  const contactInfo = {
    userId: order?.userId,
    name: order?.name,
    SNSId: order?.SNSId,
    email: order?.email,
    phone: order?.phone,
    comment: order?.comment,
  } as ContactInfo;

  const requirement = {
    attendee: service?.attendee,
    queues: order?.queues,
  } as unknown as Requirement;

  return (
    <RequestOrderContext.Provider
      value={{
        service,
        contactInfo,
        requirement,
        selectedTime,
        setSelectedTime,
      }}
    >
      {children}
    </RequestOrderContext.Provider>
  );
};

export function useRequestOrderContext() {
  const context = useContext(RequestOrderContext);
  if (context === undefined) {
    throw new Error(
      'The RequestOrderContext hook must be used within a RequestOrderContextProvider.Provider'
    );
  }
  return context;
}
