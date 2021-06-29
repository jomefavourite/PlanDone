const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID =
  '382056987713-jtb1r4ocgqarjnie5ivfss8goebpokcr.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'fEXQmAhiVdiWC6Akfw3lE7Mu';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // User.findOrCreate({googleId: profile.id}, function (err, user) {
      //   return done(err, user);
      // });
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
