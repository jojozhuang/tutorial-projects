var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require("../controllers/product");

router.post("/", product_controller.product_create);

router.get("/:id", product_controller.product_readone);

router.put("/:id", product_controller.product_update);

router.delete("/:id", product_controller.product_delete);

router.get("/", product_controller.product_all);

module.exports = router;
