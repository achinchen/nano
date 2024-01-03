import { setupControllerMonitor } from '~backend/domain/shared/monitor';

export const middleware = (name: string) =>
  function (req, res, next) {
    setupControllerMonitor(
      name,
      `${req.method}${req.path}`,
      req.body ?? JSON.stringify(req.body)
    );
    next();
  };
