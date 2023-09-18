import { Message } from '~frontend/components/Message/Message';
import { useMessagesContext, MessagesContextProvider } from './context';
import { MESSAGES_ROOT_ID } from './constants';

function MessagesWithContext() {
  const { messages } = useMessagesContext();
  const withoutMessages = messages.length === 0;

  return (
    <div
      id={MESSAGES_ROOT_ID}
      className="position-fixed bottom-0 left-0 flex flex-col items-center"
      hidden={withoutMessages}
    >
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
}

export function Messages() {
  return (
    <MessagesContextProvider>
      <MessagesWithContext />
    </MessagesContextProvider>
  );
}
