import type { Profile } from 'passport';
import type { User } from '~backend/domain/user/entity';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userFederatedCredentialRepository } from '~backend/domain/user/repository/user-federated-credential';
import { createUserUseCase } from '~backend/domain/user/use-case/create-user';
import { userRepository } from '~backend/domain/user/repository/user';

export async function verify(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  cb: (error: null | Error, user?: User | false) => void
) {
  try {
    const federatedCredential =
      await userFederatedCredentialRepository.getByProviderAndSubject({
        provider: 'google',
        subject: profile.id,
      });

    if (!federatedCredential) {
      const [error, user] = await createUserUseCase.execute({
        nickname: profile.displayName,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        email: profile.emails?.[0].value || '',
        phone: '',
        provider: 'google',
        subject: profile.id || '',
      });
      if (error) return cb(null, false);
      return cb(null, user);
    } else {
      const user = await userRepository.getById(federatedCredential.userId);
      if (!user) return cb(null, false);
      return cb(null, user);
    }
  } catch (error) {
    return cb(error);
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CLIENT_HOST}/api/login/callback/google`,
      state: true,
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    },
    verify
  )
);

passport.serializeUser(function (user: User, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, nickname: user.nickname, email: user.email });
  });
});

passport.deserializeUser(function (user: User, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

export { passport };
