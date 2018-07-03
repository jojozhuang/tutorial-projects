var express = require("express");
var router = express.Router();

var question_controller = require("../controllers/question");
var submission_controller = require("../controllers/submission");

// questions
router.get("/questions", question_controller.question_all);
router.get(
  "/question/:uniquename",
  question_controller.question_findByUniqueName
);

// submissions
router.post("/", submission_controller.submission_create);

router.get("/:id", question_controller.question_readone);

router.put("/:id", submission_controller.submission_update);

router.get("/one/:names", submission_controller.submission_findByName);

//router.put("/:names", submission_controller.submission_update);
router.get("/all/:names", submission_controller.submission_all);

router.post("/run", submission_controller.submission_run);

module.exports = router;
