import supertest from 'supertest';
import express from 'express';
import { auth, authSilent } from '~backend/domain/shared/http/middleware/auth';
import { setting } from './setting';
import { me } from './me';
import {
  loginFederatedGoogle,
  loginCallbackGoogle,
  loginCallbackGoogleSuccess,
} from './login';
import router from '.';

const app = express();
app.use(router);
const request = supertest(app);

jest.mock('./login', () => {
  return {
    loginFederatedGoogle: jest.fn().mockReturnValue((req, res) => {
      res.end();
    }),
    loginCallbackGoogle: jest.fn().mockReturnValue((req, res, next) => {
      next();
    }),
    loginCallbackGoogleSuccess: jest.fn((req, res) => {
      res.end();
    }),
  };
});

jest.mock('./logout', () => {
  return {
    logout: jest.fn((req, res) => {
      res.end();
    }),
  };
});

jest.mock('./setting', () => {
  return {
    setting: jest.fn((req, res) => {
      res.end();
    }),
  };
});

jest.mock('./me', () => {
  return {
    me: jest.fn((req, res) => {
      res.end();
    }),
  };
});

jest.mock('~backend/domain/shared/http/middleware/transaction', () => {
  return {
    middleware: jest.fn().mockReturnValue((req, res, next) => {
      next();
    }),
  };
});

jest.mock('~backend/domain/shared/http/middleware/auth', () => {
  return {
    auth: jest.fn((req, res, next) => {
      next();
    }),
    authSilent: jest.fn((req, res, next) => {
      next();
    }),
  };
});

describe('User routes', () => {
  it('/login/federated/google', async () => {
    await request.get('/login/federated/google');
    expect(loginFederatedGoogle).toHaveBeenCalled();
  });

  it('/login/callback/google', async () => {
    await request.get('/login/callback/google');
    expect(loginCallbackGoogle).toHaveBeenCalled();
    expect(loginCallbackGoogleSuccess).toHaveBeenCalled();
  });

  it('/users/setting', async () => {
    await request.get('/users/setting');
    expect(auth).toHaveBeenCalled();
    expect(setting).toHaveBeenCalled();
  });

  it('/users/me', async () => {
    await request.get('/users/me');
    expect(authSilent).toHaveBeenCalled();
    expect(me).toHaveBeenCalled();
  });
});
