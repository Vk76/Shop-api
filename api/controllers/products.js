const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
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
            res.status(500).json({
                error: {
                    message: err
                }
            });
        });
};

exports.products_create_product = (req, res, next) => {
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
                    productImage: result.productImage,
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
            res.status(500).json({
                error: {
                    message: err
                }
            });
        });
};

exports.products_get_product = (req, res, next) => {
    var id = req.params.productId;
    Product.findById(id)
        .select("name price productImage _id")
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
                    .json({
                        error: {
                            message: "No valid entry found for provided Id"
                        }
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: {
                    message: err
                }
            });
        });
};

exports.products_update_product = (req, res, next) => {
    var id = req.params.productId;
    const updates = {};
    for (const prop of req.body) {
        updates[prop.propName] = prop.value;
    }
    Product.update({
            _id: id
        }, {
            $set: updates
        })
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
            res.status(500).json({
                error: {
                    message: err
                }
            });
        });
};

exports.products_delete = (req, res, next) => {
    var id = req.params.productId;
    Product.remove({
            _id: id
        })
        .exec()
        .then((data) => {
            res.status(200).json({
                message: "Product deleted successfully",
                request: {
                    type: "POST",
                    destination: "Create new Product",
                    url: "http://localhost:3000/products",
                    body: {
                        name: "String",
                        price: "Number"
                    },
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: {
                    message: err
                }
            });
        });
};