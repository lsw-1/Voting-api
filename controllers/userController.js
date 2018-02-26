const passport = require('passport');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    await user.save();
    const token = user.generateJwt();
    res.status(200);
    res.json({
      token,
    });
  } catch (err) {
    console.log('error');
  }
};

exports.login = async (req, res) => {
  passport.authenticate('local', function(err, user, info) {
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      const token = user.generateJwt();
      res.status(200);
      res.json({
        token: token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

exports.logout = (req, res) => {};
