import { Router } from 'express';
import { passport } from '~backend/domain/user/service/auth/google';
import { middleware as transactionMiddleware } from '~backend/domain/shared/http/middleware/transaction';
import { logout } from './logout';

export const PROVIDER = 'google';

const router = Router();
router.use(transactionMiddleware('user'));

router.get('/login/federated/google', passport.authenticate(PROVIDER));

router.get(
  '/login/callback/google',
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_HOST}/login`,
    failureRedirect: `${process.env.CLIENT_HOST}/login?failed`,
  })
);

router.get('/logout', logout());

export default router;
