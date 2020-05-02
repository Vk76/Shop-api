const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "This is GET of orders",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "This is POST of orders",
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
