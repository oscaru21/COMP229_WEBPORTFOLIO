/**
 * File name: user.js
 * author: Oscar Umana
 * student ID: 301247086
 * Date: 2022-10-18
 */
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

//create a user schema
let UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: "username is required",
      unique: true
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "email address is required",
      unique: true
    }
  },
  {
    collection: "users",
  }
);

UserSchema.plugin(passportLocalMongoose);

module.exports.User = mongoose.model("User", UserSchema);
