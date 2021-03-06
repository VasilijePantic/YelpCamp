var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// create schema for User
var UserSchema = mongoose.Schema({
    username: String,
    password: String
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);