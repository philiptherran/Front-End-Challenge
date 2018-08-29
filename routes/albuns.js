var express = require("express");
var router = express.Router();
var request = require("request");
var FuzzySearch = require('fuzzy-search');

//index route. main page
router.get("/", function(req, res){
    //data from the json url.
    request("https://itunes.apple.com/us/rss/topalbums/limit=100/json", function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body); //convert in an object
            var results = data.feed.entry;
            if(req.query.search){ //asking for a search
                var msearch= req.query.search;
                //loking for result by the title (author-album name)
                //results= JSON.parse(JSON.stringify(results).split('"im:name":').join('"name":'));
                var searcher = new FuzzySearch(results, ['title.label'], { // search parameters
                  sort: true,
                });
                results = searcher.search(msearch); //filter data
                return res.render("albuns/index.ejs", {results: results});
            }
            return res.render("albuns/index.ejs", {results: results});
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