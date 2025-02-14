//Required Modules
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const mainRoutes = require("./routes/mainRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

//Create app
const app = express();

//Configure app
let port = 8080;
let host = "localhost";
const url = "mongodb+srv://dwatter2:test123@cluster0.vifrtwz.mongodb.net/project3?retryWrites=true&w=majority";
app.set("view engine", "ejs");

//Connect Database
mongoose.connect(url)
.then(() => {
    app.listen(port, host, () => {
        console.log("Server is running on port", port);
    });
}).catch(err => console.log(err.message));

//Mount Middleware
app.use(
    session({
        secret: "nos4jdnf3ow59ejokjnod1f",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: url}),
        cookie: {maxAge: 60*60*1000}
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
})

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

app.use("/", mainRoutes);

app.use("/events", eventRoutes);

app.use("/users", userRoutes);

//app.use("/users", userRoutes);

//Error Handling
app.use((req, res, next) => {
    let err = new Error("Unable to locate: " + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render("error", {error: err});
});