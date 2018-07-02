var express = require("express");
var router = express.Router();
var authentication = require("./authentication");
var question = require("./question");
var user = require("./user");
var onlinejudge = require("./onlinejudge");

var jwt = require("express-jwt");
var auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload" // the default name is user, changed to payload to avoid ambiguousness
});

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
router.get("/", function(req, res) {
  res.json({ message: "Hello! welcome to our api!" });
});

// authentication, url: /api/authentication/login
router.use("/authentication", authentication);
// question, url: /api/question
router.use("/admin/question", auth, question);
// user, url: /api/user
router.use("/admin/user", auth, user);

// online judge, url: /api/onlinejudge
router.use("/onlinejudge", onlinejudge);

module.exports = router;