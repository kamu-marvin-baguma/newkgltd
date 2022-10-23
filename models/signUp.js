const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

const signupSchema = new mongoose.Schema({
    fullname: {
    type: String,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
  },
  password:{
    type:String,
    trim:true,
  },
  branch:{
    type:String,
    required:true,
    enum:['Kisasi', 'Namugongo', 'HeadOffice'],
    trim:true,
  },
  role:{
    type:String,
    required:true,
    enum:['director', 'manager', 'SalesAgent'],
    trim:true,
  },
});

// tell our application to use email as the user name instead of the username that is default
signupSchema.plugin(passportLocalMongoose, { usernameField: "email" });
// Export Model
module.exports = mongoose.model("Signup", signupSchema);
