const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = passport.use(new LocalStrategy(
  {
    usernameField: 'name',
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ name: username });
      if (!user) {
        done(null, false, {
          message: 'user not found',
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password wrong',
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
));
