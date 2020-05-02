const express = require("express");
const app = express();
const morgan = require("morgan");

// Routes which handle requests
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error("Invalid Request");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
