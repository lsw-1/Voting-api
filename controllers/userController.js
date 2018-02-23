const User = require("../models/User");
exports.signup = (req, res) => {
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };

    //use schema.create to insert data into the db
    User.create(userData, function(err, user) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
};

exports.login = (req, res) => {
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };

    //use schema.create to insert data into the db
    User.create(userData, function(err, user) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
};

exports.logout = (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy(err => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
};
