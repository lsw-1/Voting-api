const passport = require('passport');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const user = new User();
    user.name = req.body.name;

    user.setPassword(req.body.password);

    await user.save();
    const token = user.generateJwt();
    res.json({
      token,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.login = async (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if (user) {
      const token = user.generateJwt();
      res.json({
        token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};
