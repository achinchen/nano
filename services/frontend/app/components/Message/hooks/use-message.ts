import type { MessageProps } from '../types';
import { useCallback } from 'react';
import { uiEventEmitter } from '../utils';
import { EVENT_NAME } from '../constants';

export const useMessage = () => {
  const addMessage = useCallback((messageProps: MessageProps) => {
    uiEventEmitter.emit(EVENT_NAME, messageProps);
  }, []);

  return { addMessage };
};
