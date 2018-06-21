var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator/check");

var authentication_controller = require("../controllers/authentication");
//var user_controller = require("../controllers/user");

router.post(
  "/signup",
  [
    // check username
    check("username")
      .isLength({ min: 4 })
      .withMessage("User name must be at least 4 chars long"),
    // check password
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
    // check email
    check("email")
      .isEmail()
      .withMessage("Email address is invalid")
  ],
  authentication_controller.register
);
router.post(
  "/login",
  [
    // check username
    check("username")
      .not()
      .isEmpty()
      .withMessage("User name can't be empty"),
    // check password
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password can't be empty")
  ],
  authentication_controller.login
);

module.exports = router;
