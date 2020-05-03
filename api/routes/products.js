const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then((data) => {
      const response = {
        count: data.length,
        products: data.map((product) => {
          return {
            name: product.name,
            price: product.price,
            productImage: product.productImage,
            _id: product._id,
            request: {
              type: "GET",
              description: "For more info about a product",
              url: "http://localhost:3000/products/" + product._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: { message: err } });
    });
});

router.post("/", upload.single("productImage"), (req, res, next) => {
  // console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "product created successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            description: "For more info about a product",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
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
    .select("name price _id")
    .exec()
    .then((product) => {
      if (product) {
        res.status(200).json({
          product: product,
          request: {
            type: "GET",
            description: "List of all prodcuts",
            url: "http://localhost:3000/products/",
          },
        });
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
      res.status(200).json({
        message: "Product updated successfully",
        request: {
          type: "GET",
          description: "For more info about a product",
          url: "http://localhost:3000/products/" + id,
        },
      });
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
      res.status(200).json({
        message: "Product deleted successfully",
        request: {
          type: "POST",
          destination: "Create new Product",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: { message: err } });
    });
});

module.exports = router;
