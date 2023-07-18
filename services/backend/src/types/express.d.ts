export interface Locals {
  errors?: Array<{ code?: number; message: string }>;
  title?: string;
}

export type Session = session.Session &
  Partial<session.SessionData> & {
    messages: Array<{ code?: number; message: string }>;
  };

export type ErrorRequestHandler = (
  err: unknown,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => unknown;

export as namespace Express;
export = Express;

declare namespace Express {
  export interface Response {
    locals: Locals;
    session: Session;
  }
  export interface Request {
    locals: Locals;
    session: Session;
    csrfToken: () => string;
  }
}
