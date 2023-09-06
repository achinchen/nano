import { Message } from '~frontend/components/Message/Message';
import { useMessagesContext, MessagesContextProvider } from './context';
import { MESSAGES_ROOT_ID } from './constants';

const MessagesWithContext = () => {
  const { messages } = useMessagesContext();
  const withoutMessages = messages.length === 0;

  return (
    <div
      id={MESSAGES_ROOT_ID}
      className="position-fixed left-1/2 top-0 flex flex-col translate-x--50% items-center"
      hidden={withoutMessages}
    >
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
};

export const Messages = () => {
  return (
    <MessagesContextProvider>
      <MessagesWithContext />
    </MessagesContextProvider>
  );
};
