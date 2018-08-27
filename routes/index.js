var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.redirect("albums");
});

module.exports = router;