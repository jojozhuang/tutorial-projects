var User = require("../models/user");

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
