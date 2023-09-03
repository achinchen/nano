import newrelic from 'newrelic';

export const setupControllerMonitor = (
  name: string,
  action: Request['method']
) => {
  newrelic.setControllerName(name, action);
};

export const setupMonitor = (instance) =>
  newrelic.instrument('express', instance);

export default newrelic;
