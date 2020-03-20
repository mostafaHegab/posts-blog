const authModel = require("../models/auth.model");

exports.signup = (req, res, next) => {
    authModel
        .createNewUser(req.body)
        .then(() => {
            res.status(201).json({
                username: req.body.username,
                email: req.body.email
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};

exports.login = (req, res, next) => {
    authModel
        .login(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};

exports.verify = (req, res, next) => {
    res.status(200).json({
        userId: req.userId
    });
};
