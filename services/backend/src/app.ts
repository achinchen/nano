import path from 'node:path';
import { config } from 'dotenv';
import createError from 'http-errors';
import express, { json, urlencoded, static as expressStatic } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import logger from 'morgan';
import csrf from 'tiny-csrf';

config();

export const app = express();
app.locals.pluralize = require('pluralize');

app.use(logger('dev'));
app.use(json());

app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  csrf(
    '123456789iamasecret987654321look', // secret -- must be 32 bits or chars in length
    ['POST'], // the request methods we want CSRF protection for
    ['/detail', /\/detail\.*/i], // any URLs we want to exclude, either as strings or regexp
    [process.env.SITE_URL + '/service-worker.js'] // any requests from here will not see the token and will not generate a new one
  )
);

app.use(expressStatic(path.join(__dirname, 'assets')));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.authenticate('session'));

app.use(function (req, res, next) {
  const messages = req.session.messages || [];
  res.locals.messages = messages;
  res.locals.hasMessages = Boolean(messages.length);
  req.session.messages = [];
  next();
});

// app.use(function (req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// app.use('/', authRouter);
app.use('/', function (req, res) {
  res.send('Hello World!');
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
