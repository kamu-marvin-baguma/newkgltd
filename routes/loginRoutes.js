const express = require('express');
const router = express.Router();
const passport = require('passport');
// const signup = require("../models/signup.js")
const connectEnsureLogin = require("connect-ensure-login")

router.get('/login',connectEnsureLogin.ensureLoggedOut(),(req, res) => {
    res.render('login'),{
        title: "login"
    }

});


router.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.redirect('/login?info=' + info);
      }
  
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
       
        // localStorage.setItem('branch',res.user.branch)

        if (req.user.role === "manager"){
          //  console.log(res.user.branch);
          return res.redirect('/managerDash');
          } else if(req.user.role === "director"){
            return res.redirect('/directorDash')
          }else{
            return res.redirect('/salesDash')
          }
      });
  
    })(req, res, next);
  });



module.exports = router