var express = require("express");
var router = express.Router();
var request = require("request");

router.get("/", function(req, res){
    request("https://itunes.apple.com/us/rss/topalbums/limit=5/json", function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            var results = data["feed"]["entry"];
            res.render("albuns/index.ejs", {results: results});
        }
    });
});

module.exports = router;