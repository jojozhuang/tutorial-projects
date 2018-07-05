var mongoose = require("mongoose");
var Question = require("../models/question");
var User = require("../models/user");
var Submission = require("../models/submission");
var csv = require("csv-express");

exports.collection_list = function(req, res, next) {
  mongoose.connection.db.listCollections().toArray(function(err, collections) {
    if (err) return next(err);
    res.status(200).send(collections);
  });
};

exports.collection_getall = function(req, res, next) {
  const collectionname = req.params.name;
  if (collectionname == "questions") {
    Question.find({})
      .sort({ sequence: "asc" })
      .exec(function(err, questions) {
        if (err) return next(err);
        res.status(200).send(questions);
      });
  } else if (collectionname == "users") {
    User.find({}, function(err, users) {
      if (err) return next(err);
      res.status(200).send(users);
    });
  } else if (collectionname == "submissions") {
    Submission.find({}, function(err, submissions) {
      if (err) return next(err);
      res.status(200).send(submissions);
    });
  } else {
    var error = new ValidationError(
      "body",
      "collection",
      collectionname,
      "No data is found!"
    );
    res.status(422).json({ errors: [error] });
  }
};

exports.collection_export = function(req, res, next) {
  const name = req.params.name;
  var filename = name + ".csv";

  if (name == "questions") {
    Question.find()
      .lean()
      .exec({}, function(err, questions) {
        if (err) return next(err);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + filename
        );
        res.csv(questions, true);
      });
  } else if (name == "users") {
    User.find()
      .lean()
      .exec({}, function(err, users) {
        if (err) return next(err);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + filename
        );
        res.csv(users, true);
      });
  } else if (name == "submissions") {
    Submission.find()
      .lean()
      .exec({}, function(err, submissions) {
        if (err) return next(err);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + filename
        );
        res.csv(submissions, true);
      });
  } else {
    var error = new ValidationError(
      "body",
      "collection",
      collectionname,
      "No data is found!"
    );
    res.status(422).json({ errors: [error] });
  }
};

exports.collection_import = function(req, res, next) {};
