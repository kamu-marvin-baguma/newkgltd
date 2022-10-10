const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Signup = require("../models/signUp.js");
const connectEnsureLogin = require("connect-ensure-login")


const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signUp'),{
        title: "signup"
    }

});

//to fill in a form /edit
router.post("/signup", 
async (req, res) => {
  const signup = new Signup(req.body);
  console.log(req.body);
  await Signup.register(signup, req.body.password, (err) => {
    if (err) {
      res.status(400).render("signUp");
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});












module.exports = router