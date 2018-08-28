var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

var albunsRoutes = require("./routes/albuns.js");
var indexRoutes = require("./routes/index.js");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

/*app.use(function(req, res, next){
    //res.locals.user = req.user;
    next();
});*/

app.use("/albums",albunsRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP);