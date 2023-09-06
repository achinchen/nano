import { Messages, useMessage, Message } from '.';

describe('Message entry', () => {
  it('has Messages', () => {
    expect(Messages).toBeDefined();
  });

  it('has useMessage', () => {
    expect(useMessage).toBeDefined();
  });
  it('has Message', () => {
    expect(Message).toBeDefined();
  });
});
