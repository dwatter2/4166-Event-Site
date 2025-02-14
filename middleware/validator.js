const {body} = require("express-validator");

//validates user id
exports.validateId = (req, res, next) => {
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body("firstName", "First name must be filled out").notEmpty().trim().escape(),
body("lastName", "Last name must be filled out").notEmpty().trim().escape(),
body("email", "Invalid Email").isEmail().trim().escape().normalizeEmail(), 
body("password", "Password must be between 6-64").isLength({min: 6, max: 64})]

exports.validateSignIn = [body("email", "Invalid Email").isEmail().trim().escape().normalizeEmail(), 
body("password", "Password must be between 6-64").isLength({min: 6, max: 64})]