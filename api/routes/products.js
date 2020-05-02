const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((product) => {
      console.log("From Database", product);
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: { message: err } });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "This is Handling POST request of /products",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: { message: err } });
    });
});

router.get("/:productId", (req, res, next) => {
  var id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((product) => {
      console.log("From Database", product);
      if (product) {
        res.status(200).json(product);
      } else {
        res
          .status(404)
          .json({ error: { message: "No valid entry found for provided Id" } });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: { message: err } });
    });
});

router.patch("/:productId", (req, res, next) => {
  var id = req.params.productId;
  const updates = {};
  for (const prop of req.body) {
    updates[prop.propName] = prop.value;
  }
  Product.update({ _id: id }, { $set: updates })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: { message: err } });
    });
});

router.delete("/:productId", (req, res, next) => {
  var id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: { message: err } });
    });
});

module.exports = router;
