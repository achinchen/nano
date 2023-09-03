import { Router } from 'express';
import { passport } from '~backend/domain/user/service/auth/google';
import { setupControllerMonitor } from '~backend/domain/shared/monitor';
import { logout } from './logout';

export const PROVIDER = 'google';

const router = Router();
router.use(function (req, res, next) {
  setupControllerMonitor('user', `${req.method}/${req.path}`);
  next();
});

router.get('/login/federated/google', passport.authenticate(PROVIDER));

router.get(
  '/oauth2/redirect/google',
  passport.authenticate(PROVIDER, {
    successReturnToOrRedirect: '/health-check?success',
    failureRedirect: '/health-check?failure',
  })
);

router.get('/logout', logout());

export default router;
