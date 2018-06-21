var express = require("express");
var router = express.Router();
var authentication = require("./authentication");
var profile = require("./profile");
var question = require("./question");
var user = require("./user");

var jwt = require("express-jwt");
var auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload"
});

// authentication
router.use("/authentication", authentication); // /api/authentication/login
// profile
router.use("/profile", auth, profile); // /api/profile

// question
router.use("/question", question); // /api/question
// user
router.use("/user", user); // /api/user

module.exports = router;
