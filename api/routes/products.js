const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "This is GET of products",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "This is POST of products",
  });
});

router.get("/:productId", (req, res, next) => {
  var id = req.params.productId;
  var message = "";
  if (id === "special") message = "This is special Id";
  else message = "This is normal Id";
  res.status(200).json({
    message: message,
  });
});

router.patch("/:productId", (req, res, next) => {
  var id = req.params.productId;
  res.status(200).json({
    message: "Product Updated",
    id: id,
  });
});

router.delete("/:productId", (req, res, next) => {
  var id = req.params.productId;
  res.status(200).json({
    message: "Product Deleted",
    id: id,
  });
});

module.exports = router;
