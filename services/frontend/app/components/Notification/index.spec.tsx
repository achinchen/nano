import { Notifications, useNotification, Notification } from '.';

describe('Notification entry', () => {
  it('has Notifications', () => {
    expect(Notifications).toBeDefined();
  });

  it('has useNotification', () => {
    expect(useNotification).toBeDefined();
  });
  it('has Notification', () => {
    expect(Notification).toBeDefined();
  });
});
