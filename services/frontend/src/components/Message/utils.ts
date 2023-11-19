import { createEventEmitter } from '~frontend/utils/event';

const SERVICE_NAME = 'bukku:frontend:ui';
export const uiEventEmitter = createEventEmitter(SERVICE_NAME);
