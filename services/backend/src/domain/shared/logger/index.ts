import path from 'node:path';
import { createLogger, format, transports } from 'winston';
import { TIMESTAMP_FORMAT } from './constants';
const { combine, timestamp, simple, colorize, json } = format;

const filename = path.join(__dirname, 'error.log');

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({
      format: TIMESTAMP_FORMAT,
    }),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename, level: 'error' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize(), simple()),
    })
  );
}

export { logger };
