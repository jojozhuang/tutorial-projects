var express = require("express");
var router = express.Router();

router.post("/", function(req, res) {
  res.send("Create product");
});

router.get("/:id", function(req, res) {
  res.send("Get one product by id");
});

router.put("/:id", function(req, res) {
  res.send("Update product");
});

router.delete("/:id", function(req, res) {
  res.send("Delete product");
});

router.get("/", function(req, res) {
  res.send("Get all products");
});

module.exports = router;
