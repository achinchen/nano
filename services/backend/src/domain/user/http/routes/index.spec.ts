import { passport as AuthService } from '~backend/domain/user/service/auth/google';
import { logout } from './logout';

jest.mock('./logout', () => {
  return {
    logout: jest.fn().mockReturnValue(() => {
      /**/
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

import router, { PROVIDER } from '.';

it('calls AuthService.authenticate with the correct provider for /login/federated/google', async () => {
  await router.get('/login/federated/google');
  expect(AuthService.authenticate).toHaveBeenCalledWith(PROVIDER);
});

it('calls AuthService.authenticate with the correct options for /oauth2/redirect/google', async () => {
  await router.get('/oauth2/redirect/google');
  expect(AuthService.authenticate).toHaveBeenCalledWith(PROVIDER, {
    successReturnToOrRedirect: '/health-check?success',
    failureRedirect: '/health-check?failure',
  });
});

it('calls the logout function for /logout', async () => {
  await router.get('/logout');
  expect(logout).toHaveBeenCalled();
});