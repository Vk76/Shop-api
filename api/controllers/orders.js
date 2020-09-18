const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select("product quantity _id")
        .populate("product", "name")
        .exec()
        .then((data) => {
            res.status(200).json({
                count: data.length,
                orders: data.map((data) => {
                    return {
                        _id: data._id,
                        product: data.product,
                        quantity: data.quantity,
                        request: {
                            type: "GET",
                            description: "Get more info about order",
                            url: "http://localhost:3000/orders/" + data._id,
                        },
                    };
                }),
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: {
                    message: err,
                },
            });
        });
};

exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }

            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId,
            });
            return order.save();
        })
        .then((result) => {
            res.status(201).json({
                message: "Order stored",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                },
                request: {
                    type: "GET",
                    description: "For more info about a order",
                    url: "http://localhost:3000/orders/" + result._id,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: {
                    message: err,
                },
            });
        });
};

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate("product")
        .exec()
        .then((order) => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found",
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: "GET",
                    description: "For Getting all orders",
                    url: "http://localhost:3000/orders",
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: {
                    message: err,
                },
            });
        });
};

exports.orders_delete_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .exec()
        .then((order) => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found",
                });
            }
            Order.remove({
                    _id: req.params.orderId,
                })
                .exec()
                .then((result) => {
                    res.status(200).json({
                        message: "Order deleted",
                        request: {
                            type: "POST",
                            description: "Add another order",
                            url: "http://localhost:3000/orders",
                            body: {
                                productId: "ID",
                                quantity: "Number",
                            },
                        },
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: {
                    message: err,
                },
            });
        });
};