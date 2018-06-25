var Question = require("../models/question");

exports.question_create = function(req, res, next) {
  var question = new Question({
    sequence: req.body.sequence,
    title: req.body.title,
    description: req.body.description,
    mainfunction: req.body.mainfunction,
    difficulty: req.body.difficulty
  });

  question.save({ new: true }, function(err, question) {
    if (err) {
      return next(err);
    }
    res.status(200).send(question);
  });
};

exports.question_readone = function(req, res, next) {
  Question.findById(req.params.id, function(err, question) {
    if (err) {
      return next(err);
    }
    res.status(200).send(question);
  });
};

exports.question_update = function(req, res, next) {
  Question.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function(err, question) {
      if (err) return next(err);
      res.status(200).send(question);
    }
  );
};

exports.question_delete = function(req, res, next) {
  Question.findByIdAndRemove(req.params.id, function(err, question) {
    if (err) return next(err);
    res.status(200).send(question);
  });
};

exports.question_all = function(req, res, next) {
  Question.find({}, function(err, questions) {
    if (err) return next(err);
    res.status(200).send(questions);
  });
};
