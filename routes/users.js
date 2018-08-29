var express = require("express");
var router = express.Router();
var user = require("../models/user.js");

router.get("/:id", function(req, res){
    user.findById(req.params.id, function(err, user){
        if(err){
            console.log(err);
            res.redirect("albums");
        }else{
            res.render("users/show.ejs", {user:user});
        }
    });
});

module.exports = router;