var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator/check");

var user_controller = require("../controllers/user");

router.post(
  "/signup",
  [
    // username must be an email
    check("username")
      .isLength({ min: 4 })
      .withMessage("User name must be at least 4 chars long"),
    // password must be at least 5 chars long
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
    check("email")
      .isEmail()
      .withMessage("Email address is invalid")
  ],
  user_controller.user_signup
);
router.post("/login", user_controller.user_login);

module.exports = router;
