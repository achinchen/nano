import { Router } from 'express';
// import { passport } from '~/backend/domain/user/service/auth/google';

const router = Router();
// router.get('/login/federated/google', passport.authenticate('google'));

router.get('/', function (req, res) {
  res.send('respond with a resource');
});

// router.get(
//   '/oauth2/redirect/google',
//   passport.authenticate('google', {
//     successReturnToOrRedirect: '/',
//     failureRedirect: '/login',
//   })
// );

// router.post('/logout', function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

export default router;
