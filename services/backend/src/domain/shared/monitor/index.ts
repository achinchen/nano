import newrelic from 'newrelic';

export const setupControllerMonitor = (
  name: string,
  action: Request['method'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  payload?: any
) => {
  newrelic.setControllerName(name, action, payload);
};

export const setupMonitor = (instance) =>
  newrelic.instrument('express', instance);

export default newrelic;
