let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

//create a user schema
let UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: "username is required",
    },
    // password: {
    //     type: String,
    //     trim: true,
    //     required: "password is required",
    //   },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "email address is required",
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display Name is required",
    },
  },
  {
    collection: "users",
  }
);

// configure options for User Model

//let options = { missingPasswordError: "Wrong / Missing Password" };

//UserSchema.plugin(passportLocalMongoose, options);
UserSchema.plugin(passportLocalMongoose);

module.exports.User = mongoose.model("User", UserSchema);
