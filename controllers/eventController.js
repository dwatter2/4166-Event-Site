const model = require("../models/event");

exports.index = (req, res, next) => {
    model.find()
    .then(events => res.render("./event/index", {events}))
    .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render("./event/new");
};

exports.create = (req, res, next) => {
    let event = new model(req.body);
    event.image = req.file.filename;
    event.host = req.session.user;

    event.save()
    .then((event) => {
        res.redirect("/events");
    })
    .catch(err => {
        if(err.name === "ValidationError") {
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("Invalid Event id");
        err.status = 400;
        return next(err);
    }

    model.findById(id).populate("host", "firstName lastName")
    .then(event => {
        if(event) {
            return res.render("./event/show", {event});
        } else {
            let err = new Error("Unable to locate event with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("Invalid Event id");
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(event => {
        res.render("./event/edit", {event});
    })
    .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let id = req.params.id;
    let event = req.body;
    event.image = req.file.filename;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("Invalid Event id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event => {
        res.redirect("/events/" + id);
    })
    .catch(err => {
        if(err.name === "ValidationError") {
            err.status = 400;
        }
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("Invalid Event id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event => {
        res.redirect("/events");
    })
    .catch(err => next(err));
};

exports.rsvp = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("Invalid Event id");
        err.status = 400;
        return next(err);
    }
}