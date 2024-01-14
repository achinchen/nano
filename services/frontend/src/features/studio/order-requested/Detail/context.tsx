import type { Service } from '~frontend/features/studio/types';
import { useParams } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';

type ContactInfo = {
  name: string;
  SNSId: string;
  email: string;
  phone: string;
  comment: string;
};

type Time = string;

type Queue = {
  currentAttendee: number;
  attendee: number;
  time: Time;
  disabled: boolean;
};

type Requirement = {
  attendee: number;
  queues: Queue[];
};

export type InitialState = {
  service: Service;
  contactInfo: ContactInfo;
  requirement: Requirement;
  selectedTime: Time | undefined;
  setSelectedTime: React.Dispatch<React.SetStateAction<Time | undefined>>;
};

export const RequestOrderContext = createContext<InitialState>({
  service: {} as Service,
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

  const [service] = useState({
    name: '創業諮詢',
    duration: 60,
    location: {
      name: '台北',
      address: '台北市中正區重慶南路一段122號',
    },
    attendee: 20,
    id: 12,
    supplier: '阿狗狗',
    description:
      '創業諮詢的敘述內容，創業諮詢的敘述內容，創業諮詢的敘述內容，創業諮詢的敘述內容，創業諮詢的敘述內容，創業諮詢的敘述內容，創業諮詢的敘述內容，創業諮詢的敘述內容，創業諮詢的敘述內容。',
    queue: Number(id) % 2 === 0,
    allday: true,
  });
  const [contactInfo] = useState({
    name: '阿狗',
    SNSId: 'a.gogo.chen',
    email: 'example@example.com',
    phone: '0912345678',
    comment: '我想要預約',
  });

  const [requirement] = useState({
    attendee: 1,
    queues: [
      {
        currentAttendee: 1,
        attendee: 3,
        time: '2024-08-01T10:00:00',
        disabled: true,
      },
      {
        currentAttendee: 0,
        attendee: 3,
        time: '2023-12-31T11:00:00',
        disabled: false,
      },
    ],
  });

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
