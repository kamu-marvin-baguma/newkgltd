const express = require('express');
const router = express.Router();
const produceModel = require("../models/produceModel")
const connectEnsureLogin = require("connect-ensure-login")

router.get('/produce', connectEnsureLogin.ensureLoggedIn(),
 (req, res) => {
    if (req.user.role === "manager" || req.user.role === "director "){
    res.render('produce')}
    else {
        res.redirect("/managerDash")
    }

});


router.get('/produce-list',async (req, res) => {
    const sales = await salesModel.find()
    res.render('produceList',{
        title: "produceList"
    })

});




module.exports = router