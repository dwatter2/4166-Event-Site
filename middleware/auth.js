const Event = require("../models/event");

//check if user is guest
exports.isGuest = (req, res, next) => {
    if(!req.session.user) {
        return next();
    } else {
        req.flash("error", "You have already logged in");
        return res.redirect("/users/profile");
    }
};

//check user authentication
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user) {
        return next();
    } else {
        req.flash("error", "You are not logged in");
        return res.redirect("/users/login");
    }
};

exports.isAuthor = (req, res, next) => {
    let id = req.params.id;

    Event.findById(id)
    .then(event => {
        if(event) {
            if(event.host == req.session.user) {
                return next();
            } else {
                let err = new Error("Unauthorized resource access");
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find event with id ' + id);
            err.status = 404;
            next(err);
        }
    }).catch(err => next(err));
};