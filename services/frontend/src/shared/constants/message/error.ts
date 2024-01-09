import type { MessageProps } from '~frontend/components/Message/types';
import i from './i.json';

export const ERROR_MESSAGE: MessageProps = {
  severity: 'error',
  title: i.title,
  children: i.content,
};
