import '~backend/domain/shared/monitor';
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';
import { TIMESTAMP_FORMAT } from '~backend/domain/shared/logger/constants';

const { combine, timestamp, json, colorize, simple } = format;

const logger = createLogger({
  level: 'http',
  format: combine(
    timestamp({
      format: TIMESTAMP_FORMAT,
    }),
    json()
  ),
  transports: [new transports.Console()],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize(), simple()),
    })
  );
}

export const middleware = morgan(
  (tokens, req, res) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      'content-length': tokens.res(req, res, 'content-length'),
      'response-time': Number.parseFloat(tokens['response-time'](req, res)),
    });
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        logger.http('incoming-request', data);
      },
    },
  }
);
