const moment = require("moment");
const User = require("../models/user");
const Ctypto = require("../utils/").Ctypto;
const { check, validationResult } = require("express-validator/check");

exports.user_create = function(req, res, next) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  user.save({ new: true }, function(err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).send(user);
  });
};

exports.user_readone = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).send(user);
  });
};

exports.user_update = function(req, res, next) {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function(err, user) {
      if (err) return next(err);
      res.status(200).send(user);
    }
  );
};

exports.user_delete = function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return next(err);
    res.status(200).send(user);
  });
};

exports.user_all = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) return next(err);
    res.status(200).send(users);
  });
};

exports.user_signup = function(req, res, next) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findOne({ username: user.username }, function(err, user) {
    if (user) {
      res.status(422).send("User Name is existed!");
    } else {
      User.findOne({ email: user.email }, function(err, user) {
        if (user) {
          res.status(422).send("Email is existed!");
        } else {
          Ctypto.saltAndHash(user.password, function(hash) {
            user.password = hash;
            // append date stamp when record was created //
            user.timecreated = moment().format("MMMM Do YYYY, h:mm:ss a");
            user.save({ new: true }, function(err, user) {
              if (err) {
                return next(err);
              }
              res.status(200).send(user);
            });
          });
        }
      });
    }
  });
};

exports.user_login = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {
    if (err == null) {
      res.status(200).send("User not found!");
    } else {
      Ctypto.validatePassword(password, user.password, function(err, res) {
        if (res) {
          res.status(200).send(user);
        } else {
          res.status(200).send("Invalid password!");
        }
      });
    }
  });
};
