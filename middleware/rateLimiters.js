const rateLimit = require("express-rate-limit");

exports.limitSignIn = rateLimit({
    windowMs: 60 * 1000,
    max: 6,

    handler: (req, res, next) => {
        let err = new Error("Too many login attempts, please try again later");
        err.status = 429;
        return next(err);
    }
});