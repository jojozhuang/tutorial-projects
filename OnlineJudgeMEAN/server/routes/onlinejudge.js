var express = require("express");
var router = express.Router();

var question_controller = require("../controllers/question");

router.get("/questions", question_controller.question_all);

module.exports = router;
