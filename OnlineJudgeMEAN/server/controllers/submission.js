var Submission = require("../models/submission");
const ValidationError = require("../models/validationerror");
const ErrorUtil = require("../utils/").ErrorUtil;
const RunnerManager = require("../compiler/RunnerManager");
const moment = require("moment");
const sleep = require("sleep");

exports.submission_create = function(req, res, next) {
  //sleep.sleep(3); //sleep for 3 seconds
  var submission = new Submission({
    username: req.body.username,
    questionname: req.body.questionname,
    language: req.body.language,
    solution: req.body.solution,
    status: -1, // not submitted -> just created
    timeupdated: moment(new Date(Date.now())),
    timesubmitted: null,
    runtime: 0
  });

  submission.save({ new: true }, function(err, submission) {
    if (err) {
      return next(err);
    }
    res.status(200).send(submission);
  });
};

exports.submission_readone = function(req, res, next) {
  Submission.findById(req.params.id, function(err, submission) {
    if (err) {
      return next(err);
    }
    res.status(200).send(submission);
  });
};

exports.submission_update = function(req, res, next) {
  //sleep.sleep(3); //sleep for 3 seconds
  var upd = {
    username: req.body.username,
    questionname: req.body.questionname,
    language: req.body.language,
    solution: req.body.solution,
    status: req.body.status,
    timeupdated: moment(new Date(Date.now()))
  };

  Submission.findByIdAndUpdate(
    req.params.id,
    { $set: upd },
    { new: true },
    function(err, submission) {
      if (err) return next(err);
      res.status(200).send(submission);
    }
  );
};

exports.submission_findByName = function(req, res, next) {
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

  // find the latest one with the given user name and quenstion name
  Submission.findOne(
    { username: names[0], questionname: names[1] },
    null,
    { sort: { timecreated: -1 } },
    function(err, submission) {
      if (err) {
        return next(err);
      }
      if (submission) {
        console.log(submission);
        res.status(200).send(submission);
      } else {
        res.status(200).send();
      }
    }
  );
};

exports.submission_all = function(req, res, next) {
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

  Submission.find({
    username: names[0],
    questionname: names[1],
    status: { $ne: -1 }
  })
    .sort({ timesubmitted: "desc" })
    .exec(function(err, submissions) {
      if (err) return next(err);
      res.status(200).send(submissions);
    });
};

exports.submission_run = function(req, res, next) {
  //sleep.sleep(3); //sleep for 3 seconds
  var newsubmit = new Submission({
    username: req.body.username,
    questionname: req.body.questionname,
    language: req.body.language,
    solution: req.body.solution,
    status: -1, // not submitted -> just created
    timeupdated: moment(new Date(Date.now())),
    timesubmitted: moment(new Date(Date.now())),
    runtime: 0
  });

  console.log(newsubmit);

  // 1. Save the submission first
  newsubmit.save({ new: true }, function(err, submission) {
    if (err) {
      return next(err);
    }
    // 2. Then, run the solution to get the test result
    RunnerManager.run(
      submission.questionname,
      submission.language,
      submission.solution,
      function(status, message) {
        const result = {
          status,
          message
        };
        if (status == "10") {
          // 3. Find the submission
          Submission.findById(submission.id, function(err, submission) {
            // update status
            submission.status = status;
            submission.runtime = 9;

            console.log(submission);
            // 4. Update the submission
            submission.save(function(err) {
              if (err) return next(err);
              res.end(JSON.stringify(result));
            });
          });
        } else {
          res.end(JSON.stringify(result));
        }
      }
    );
  });
};
