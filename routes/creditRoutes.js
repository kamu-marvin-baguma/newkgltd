const express = require("express")
const creditModel = require("../models/creditModel")
const connectEnsureLogin = require("connect-ensure-login")

const router = express.Router()

router.get('/credit', connectEnsureLogin.ensureLoggedIn(),
 async (req, res) => {
    if (req.user.role === "manager" || req.user.role === "salesAgent "){
        res.render('credit',{tb_credits:CredentialsContainer,Username:req.user.name})}
        else {
            res.redirect("/managerDash")
        }
});

router.get("/credit-list",async (req, res) => {
    const credit = await creditModel.find()
    res.render("creditList", {
        title: "creditlist", credit: credit
    })
})


router.post("/newCredit",async (req, res) => {
    try {
        const newCredit = new creditModel(req.body)
        await newCredit.save()
        res.redirect("/credit-list")
        console.log(req.body)
    }
    catch (err) {
        res.status(400).render("creditForm")
        console.log(err)
    }
})




module.exports = router