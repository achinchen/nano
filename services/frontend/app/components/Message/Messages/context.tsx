import type {
  Message,
  MessageProps,
  MessageId,
} from '~frontend/components/Message/types';
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { EVENT_NAME } from '~frontend/components/Message/constants';
import { uiEventEmitter } from '~frontend/components/Message/utils';
import { generateId } from './utils';

type InitialState = {
  messages: Message[];
};

export const MessagesContext = createContext<InitialState>({
  messages: [],
});

MessagesContext.displayName = 'MessagesContext';

export const MessagesContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const countRef = useRef(0);

  const onClose = (targetId: MessageId) => {
    setMessages((messages) =>
      messages.filter((message) => message.id !== targetId)
    );
  };

  const addMessage = useCallback((payload: MessageProps) => {
    countRef.current += 1;
    const id = generateId(countRef.current);
    setMessages((messages) => [
      ...messages,
      {
        ...payload,
        id,
        onClose: () => {
          payload.onClose?.();
          onClose(id);
        },
      },
    ]);
  }, []);

  useEffect(() => {
    uiEventEmitter.unsubscribe(EVENT_NAME, addMessage);
    uiEventEmitter.subscribe(EVENT_NAME, addMessage);
    return () => uiEventEmitter.unsubscribe(EVENT_NAME, addMessage);
  }, [addMessage]);

  return (
    <MessagesContext.Provider
      value={{
        messages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export function useMessagesContext() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error(
      'The MessagesContext hook must be used within a MessagesContextProvider.Provider'
    );
  }
  return context;
}
