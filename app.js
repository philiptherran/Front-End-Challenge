var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");

var app = express();
var url = process.env.DATABASEURL || "mongodb://localhost:27017/albums";
mongoose.connect(url, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

var user = require("./models/user.js");
var albunsRoutes = require("./routes/albuns.js");
var indexRoutes = require("./routes/index.js");
var usersRoutes = require("./routes/users.js");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(require('express-session')({
    secret:"chele is the best",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

app.use("/albums",albunsRoutes);
app.use(indexRoutes);
app.use("/users",usersRoutes);

app.listen(process.env.PORT, process.env.IP);