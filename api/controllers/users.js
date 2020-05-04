const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: {
                                message: err
                            }
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        });
                        user
                            .save()
                            .then((result) => {
                                res.status(201).json({
                                    message: "User created",
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
                    }
                });
            }
        });
};

exports.user_login = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                res.status(401).json({
                    message: "Auth failed",
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0].id,
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "5h"
                        }
                    );
                    return res
                        .status(200)
                        .json({
                            message: "Auth Sucessful",
                            token: token
                        });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
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

exports.user_delete = (req, res, next) => {
    User.findById(req.params.userId)
        .exec()
        .then((user) => {
            User.remove({
                    _id: req.params.userId
                })
                .exec()
                .then((result) => {
                    //   console.log(result);
                    res.status(200).json({
                        message: "User deleted",
                    });
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