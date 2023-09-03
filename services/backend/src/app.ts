import path from 'node:path';
import createError from 'http-errors';
import express, { json, urlencoded, static as expressStatic } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import csrf from 'tiny-csrf';
import { config } from 'dotenv';
import { middleware as loggerMiddleware } from './domain/shared/http/middleware/logger';
import authRouter from './domain/user/http/routes';
import orderRouter from './domain/order/http/routes';
import providerRouter from './domain/provider/http/routes';
import { setupMonitor } from './domain/shared/monitor';

config();
setupMonitor(express);

export const app = express();
app.locals.pluralize = require('pluralize');

app.use(json());

app.use(urlencoded({ extended: false }));
app.use(cookieParser('123456789iamasecret987654321look'));
app.use(csrf('123456789iamasecret987654321look'));

app.use(expressStatic(path.join(__dirname, 'assets')));
app.use(
  session({
    secret: '123456789iamasecret987654321look',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: app.get('env') === 'production', signed: true },
  })
);

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use(function (req, res, next) {
  const messages = req.session.messages || [];
  res.locals.messages = messages;
  res.locals.hasMessages = Boolean(messages.length);
  req.session.messages = [];
  next();
});

app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(loggerMiddleware);

app.use('/', authRouter);
app.use('/', providerRouter);
app.use('/', orderRouter);

app.use('/health-check', function (req, res) {
  res.send('pong');
});

function isAuthenticated(req, res, next) {
  if (req.session.passport?.user) next();
  else next('route');
}

app.get('/', isAuthenticated, function (req, res) {
  res.send(`hello, ${req.session.passport.user.nickname}`);
});

app.get('/', function (req, res) {
  res.send(`hello, guest`);
});

app.use(function (req, res, next) {
  next(createError(404));
});

const errorRequestHandler = function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
} as express.ErrorRequestHandler;

app.use(errorRequestHandler);
