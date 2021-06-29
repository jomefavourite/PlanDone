const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User');

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
    async (request, accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.given_name,
        lastName: profile.family_name,
        image: profile.picture,
      };

      try {
        let user = await User.findOne({googleId: profile.id});

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user);
  });
});
