var Question = require("../models/question");
const ValidationError = require("../models/validationerror");

exports.question_create = function(req, res, next) {
  var question = new Question({
    sequence: req.body.sequence,
    title: req.body.title,
    uniquename: req.body.uniquename,
    description: req.body.description,
    mainfunction: req.body.mainfunction,
    difficulty: req.body.difficulty,
    frequency: req.body.frequency,
    rating: req.body.rating
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
  console.log(req.body);
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
  /*Question.find({}, function(err, questions) {
    if (err) return next(err);
    res.status(200).send(questions);
  });*/
  Question.find({})
    .sort({ sequence: "asc" })
    .exec(function(err, questions) {
      if (err) return next(err);
      res.status(200).send(questions);
    });
};

exports.question_findbyuniquename = function(req, res, next) {
  console.log(req.params.uniquename);
  Question.findOne({ uniquename: req.params.uniquename }, function(
    err,
    question
  ) {
    if (err) {
      return next(err);
    }
    if (!question) {
      var error = new ValidationError(
        "body",
        "uniquename",
        req.params.uniquename,
        "No question is found!"
      );
      res.status(422).json({ errors: [error] });
    }
    res.status(200).send(question);
  });
};
