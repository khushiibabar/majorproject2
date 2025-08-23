const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});
// You're free to define your User how you like. Passport-Local 
// Mongoose will add a username, hash and salt field to store the username,
//  the hashed password and the salt value.
//yha username or password nhi dena pda schema k undr q ki
//  passportLocalMongoose automatic hame userame, password automatic de dega
//  (salting hashing k sath de dega).

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
