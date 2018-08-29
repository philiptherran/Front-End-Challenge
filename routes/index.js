var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user.js");

router.get("/", function(req, res){
    res.redirect("albums");
});

router.get("/register", function(req, res) {
    res.render("register.ejs");
});

router.get("/login", function(req, res) {
    res.render("login.ejs");
});

router.post("/register", function(req, res) {
    var newUser = new user({username: req.body.username,
        name: req.body.name,
        last_name: req.body.last_name
    });
    
     user.register(newUser, req.body.password, function(err, user){
         if(!err){
             passport.authenticate("local")(req, res, function(){
                return res.redirect("albums");
             });
         }else{
              console.log(err.message);
              return res.redirect("register");
         }
     });
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/albums",
        failureRedirect: "/login"
    })
);

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;