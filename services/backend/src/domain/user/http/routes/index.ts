import { Router } from 'express';
import { auth, authSilent } from '~backend/domain/shared/http/middleware/auth';
import { middleware as transactionMiddleware } from '~backend/domain/shared/http/middleware/transaction';
import {
  loginFederatedGoogle,
  loginCallbackGoogle,
  loginCallbackGoogleSuccess,
} from './login';
import { setting } from './setting';
import { me } from './me/';
import { logout } from './logout';

const router = Router();
router.use(transactionMiddleware('user'));

router.get('/login/federated/google', loginFederatedGoogle());

router.get(
  '/login/callback/google',
  loginCallbackGoogle(),
  loginCallbackGoogleSuccess
);

router.get('/logout', auth, logout);

router.get('/users/setting', auth, setting);

router.get('/users/me', authSilent, me);

export default router;
