import { Router } from 'express';
import { passport } from '~backend/domain/user/service/auth/google';

const PROVIDER = 'google';

const router = Router();
router.get('/login/federated/google', passport.authenticate(PROVIDER));

router.get(
  '/oauth2/redirect/google',
  passport.authenticate(PROVIDER, {
    successReturnToOrRedirect: '/health-check?success',
    failureRedirect: '/health-check?failure',
  })
);

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export default router;
