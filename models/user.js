var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    name: {
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    }
});

schema.plugin(passportLocalMongoose);

var user = mongoose.model("user", schema);
module.exports = user;