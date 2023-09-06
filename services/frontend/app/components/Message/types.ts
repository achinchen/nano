import { SEVERITIES } from './constants';
export type MessageSeverity = (typeof SEVERITIES)[number];

export type MessageEvent = CustomEvent<MessageProps>;

export type MessageId = string;

export type MessageProps = {
  title: string;
  children: JSX.Element | string;
  severity: MessageSeverity;
  onClick?: () => void;
  onClose?: () => void;
};

export type Message = MessageProps & { id: MessageId };
