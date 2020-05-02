const express = require("express");
const router = express.Router();

// Handling incoming GET requests to /orders
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "This is GET of orders",
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(201).json({
    message: "Order Created",
    order: order,
  });
});

router.get("/:orderId", (req, res, next) => {
  var id = req.params.orderId;
  var message = "";
  if (id === "special") message = "This is special Id";
  else message = "This is normal Id";
  res.status(200).json({
    message: message,
  });
});

router.delete("/:orderId", (req, res, next) => {
  var id = req.params.orderId;
  res.status(200).json({
    message: "deleted",
    id: id,
  });
});

module.exports = router;
