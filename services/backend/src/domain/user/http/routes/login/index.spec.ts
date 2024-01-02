import { passport as AuthService } from '~backend/domain/user/service/auth/google';
import { updateSessionIdentifierAndGetToken } from '~backend/domain/shared/http/middleware/auth/token';
import { TOKEN_COOKIE_NAME } from '~backend/domain/shared/http/middleware/auth/constants';
import {
  loginCallbackGoogleSuccess,
  loginFederatedGoogle,
  loginCallbackGoogle,
  PROVIDER,
} from '.';
import { app } from '~backend/app';

jest.mock('~backend/app', () => {
  return {
    app: { get: jest.fn().mockReturnValue('test') },
  };
});

jest.mock('~backend/domain/shared/http/middleware/transaction', () => {
  return {
    middleware: jest.fn().mockReturnValue((req, res, next) => {
      next();
    }),
  };
});

jest.mock('~backend/domain/user/service/auth/google', () => {
  return {
    passport: {
      authenticate: jest.fn(() => {
        return (req, res, next) => {
          next();
        };
      }),
    },
  };
});

jest.mock('~backend/domain/shared/http/middleware/auth/token', () => {
  return {
    updateSessionIdentifierAndGetToken: jest.fn(),
  };
});

it('loginFederatedGoogle: calls AuthService.authenticate with the correct provider', async () => {
  loginFederatedGoogle();
  expect(AuthService.authenticate).toHaveBeenCalledWith(PROVIDER);
});

it('loginCallbackGoogle: calls AuthService.authenticate with the correct options', async () => {
  loginCallbackGoogle();
  expect(AuthService.authenticate).toHaveBeenLastCalledWith(PROVIDER, {
    failureRedirect: `${process.env.CLIENT_HOST}/login?failed`,
    session: false,
  });
});

describe('loginCallbackGoogleSuccess', () => {
  const req = {
    user: { id: 'test-id' },
  };

  const res = {
    cookie: jest.fn(),
    redirect: jest.fn(),
  };

  const token = 'test-token';
  (updateSessionIdentifierAndGetToken as jest.Mock).mockResolvedValue(token);

  it('sets a cookie and redirects', async () => {
    const next = jest.fn();
    await loginCallbackGoogleSuccess(req, res, next);
    expect(res.cookie).toHaveBeenCalledWith(TOKEN_COOKIE_NAME, token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: app.get('env') === 'production',
      domain: expect.any(String),
    });

    expect(res.redirect).toHaveBeenCalledWith(
      `${process.env.CLIENT_HOST}/login`
    );
  });
});
