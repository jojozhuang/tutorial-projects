var express = require("express");
var router = express.Router();
var authentication = require("./authentication");
var profile = require("./profile");

var jwt = require("express-jwt");
var auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload"
});

// profile
router.use("/profile", auth, profile); // /api/profile/profile

// authentication
router.use("/authentication", authentication); // /api/authentication/login

module.exports = router;
