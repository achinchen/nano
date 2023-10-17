'use client';

import { Notifications } from '~frontend/components/Notification';
import { Messages } from '~frontend/components/Message';

export function Global() {
  return (
    <>
      <Notifications />
      <Messages />
    </>
  );
}
