// ./controllers/product
var Product = require("../models/product");

exports.product_create = function(req, res, next) {
  var product = new Product({
    name: req.body.name,
    price: req.body.price
  });

  product.save({ new: true }, function(err, product) {
    if (err) {
      return next(err);
    }
    res.status(200).send(product);
  });
};

exports.product_readone = function(req, res, next) {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      return next(err);
    }
    res.status(200).send(product);
  });
};

exports.product_update = function(req, res, next) {
  Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function(err, product) {
      if (err) return next(err);
      res.status(200).send(product);
    }
  );
};

exports.product_delete = function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, function(err, product) {
    if (err) return next(err);
    res.status(200).send(product);
  });
};

exports.product_all = function(req, res, next) {
  Product.find({}, function(err, products) {
    if (err) return next(err);
    res.status(200).send(products);
  });
};
