var express = require("express");
var router = express.Router();
var request = require("request");

//index route. main page
router.get("/", function(req, res){
    //taking the data from the json url.
    request("https://itunes.apple.com/us/rss/topalbums/limit=100/json", function(error, response, body){
        //https://itunes.apple.com/lookup?id=211192863&entity=song
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            var results = data["feed"]["entry"];
            res.render("albuns/index.ejs", {results: results});
        }
    });
});

//show route. show an specific album. 
router.get("/:id", function(req, res){
    var id= req.params.id;
    //https://itunes.apple.com/lookup?id=211192863&entity=song
    request("https://itunes.apple.com/lookup?id="+id+"&entity=song", function(error, response, body) {
        var results = JSON.parse(body)["results"];
        res.render("albuns/show.ejs", {results:results});
    });
    
});

module.exports = router;