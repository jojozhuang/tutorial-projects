var Submission = require("../models/submission");
const ValidationError = require("../models/validationerror");
const ErrorUtil = require("../utils/").ErrorUtil;
const RunnerManager = require("../compiler/RunnerManager");

exports.submission_create = function(req, res, next) {
  var submission = new Submission({
    username: req.body.username,
    questionname: req.body.questionname,
    language: req.body.language,
    solution: req.body.solution,
    status: -1 // not submitted -> just created
  });

  submission.save({ new: true }, function(err, submission) {
    if (err) {
      return next(err);
    }
    res.status(200).send(submission);
  });
};

exports.submission_update = function(req, res, next) {
  Submission.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function(err, submission) {
      if (err) return next(err);
      res.status(200).send(submission);
    }
  );
};

/*
exports.submission_update = function(req, res, next) {
  var strname = req.params.names;
  if (!strname) {
    var error = ErrorUtil.buildError("Invalid parameter: names");
    res.status(422).json({ errors: [error] });
  }
  var names = strname.split(",");
  if (names.length != 2) {
    var error = ErrorUtil.buildError("Invalid parameter: names");
    res.status(422).json({ errors: [error] });
  }

  Submission.findOne(
    { username: names[0], questionname: names[1] },
    { $set: req.body },
    { new: true },
    function(err, submission) {
      if (err) return next(err);
      res.status(200).send(submission);
    }
  );
};
*/

exports.submission_findbyname = function(req, res, next) {
  console.log(req.params.names);
  var strname = req.params.names;
  if (!strname) {
    var error = ErrorUtil.buildError("Invalid parameter: names");
    return res.status(422).json({ errors: [error] });
  }
  var names = strname.split(",");
  if (names.length != 2) {
    var error = ErrorUtil.buildError("Invalid parameter: names");
    return res.status(422).json({ errors: [error] });
  }

  Submission.findOne({ username: names[0], questionname: names[1] }, function(
    err,
    submission
  ) {
    if (err) {
      return next(err);
    }
    if (submission) {
      console.log(submission);
      res.status(200).send(submission);
    } else {
      res.status(200).send();
    }
  });
};

exports.submission_execute = function(req, res, next) {
  var submission = new Submission({
    username: req.body.username,
    questionname: req.body.questionname,
    language: req.body.language,
    solution: req.body.solution,
    status: req.body.language
  });

  console.log(submission);
  RunnerManager.run(
    submission.questionname,
    submission.language,
    submission.solution,
    function(status, message) {
      const result = {
        status,
        message
      };
      res.end(JSON.stringify(result));
    }
  );
};
