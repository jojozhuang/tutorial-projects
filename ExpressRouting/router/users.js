var express = require("express");
var router = express.Router();

router.post("/", function(req, res) {
  res.send("Create user");
});

router.get("/:id", function(req, res) {
  res.send("Get one user by id");
});

router.put("/:id", function(req, res) {
  res.send("Update user");
});

router.delete("/:id", function(req, res) {
  res.send("Delete user");
});

router.get("/", function(req, res) {
  res.send("Get all user");
});

module.exports = router;
