import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env['GOOGLE_CLIENT_ID'],
//       clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
//       callbackURL: '/oauth2/redirect/google',
//       state: true,
//     },
//     function verify(accessToken, refreshToken, profile, cb) {
//       db.get(
//         'SELECT * FROM FederatedCredentials WHERE provider = ? AND subject = ?',
//         ['https://www.facebook.com', profile.id],
//         function (err, row) {
//           if (err) {
//             return cb(err);
//           }
//           if (!row) {
//             db.run(
//               'INSERT INTO users (name) VALUES (?)',
//               [profile.displayName],
//               function (err) {
//                 if (err) {
//                   return cb(err);
//                 }
//                 const id = this.lastID;
//                 db.run(
//                   'INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)',
//                   [id, 'https://www.facebook.com', profile.id],
//                   function (err) {
//                     if (err) {
//                       return cb(err);
//                     }
//                     const user = {
//                       id: id,
//                       name: profile.displayName,
//                     };
//                     return cb(null, user);
//                   }
//                 );
//               }
//             );
//           } else {
//             db.get(
//               'SELECT * FROM users WHERE id = ?',
//               [row.user_id],
//               function (err, row) {
//                 if (err) {
//                   return cb(err);
//                 }
//                 if (!row) {
//                   return cb(null, false);
//                 }
//                 return cb(null, row);
//               }
//             );
//           }
//         }
//       );
//     }
//   )
// );

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
