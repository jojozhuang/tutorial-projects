var express = require("express");
var router = express.Router();

var question_controller = require("../controllers/question");
var submission_controller = require("../controllers/submission");

router.get("/questions", question_controller.question_all);
router.get(
  "/question/:uniquename",
  question_controller.question_findbyuniquename
);

router.post("/", submission_controller.submission_create);

router.put("/:id", submission_controller.submission_update);

router.get("/:names", submission_controller.submission_findbyname);

//router.put("/:names", submission_controller.submission_update);

module.exports = router;
