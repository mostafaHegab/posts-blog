const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
    try {
        let data = jwt.verify(
            req.header("Authorization"),
            "hello this is my secret secret to make jwt"
        );
        req.userId = data.userId;
        next();
    } catch (error) {
        res.status(401).json({
            error: "invalid token"
        });
    }
};

exports.notAuth = (req, res, next) => {
    try {
        let data = jwt.verify(
            req.header("Authorization"),
            "hello this is my secret secret to make jwt"
        );
        res.status(200).json({
            userId: data.userId
        });
    } catch (error) {
        next();
    }
};
