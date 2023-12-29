import { passport } from '~backend/domain/user/service/auth/google';
import { updateSessionIdentifierAndGetToken } from '~backend/domain/shared/http/middleware/auth/token';
import { TOKEN_COOKIE_NAME } from '~backend/domain/shared/http/middleware/auth/constants';
import { app } from '~backend/app';

export const PROVIDER = 'google';

export const loginFederatedGoogle = () => passport.authenticate(PROVIDER);

export const loginCallbackGoogle = () =>
  passport.authenticate(PROVIDER, {
    failureRedirect: `${process.env.CLIENT_HOST}/login?failed`,
    session: false,
  });

export const loginCallbackGoogleSuccess = async (req, res) => {
  const token = await updateSessionIdentifierAndGetToken(req.user.id);
  res.cookie(TOKEN_COOKIE_NAME, token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: app.get('env') === 'production',
  });
  res.redirect(`${process.env.CLIENT_HOST}/login`);
};
