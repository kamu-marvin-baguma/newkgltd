const express = require("express")
const creditModel = require("../models/creditModel")
const connectEnsureLogin = require("connect-ensure-login")

const router = express.Router()

router.get('/credit', (req, res) => {
    res.render('creditForm',{
        title: "credit"
    })

});


router.get('/credit-list',
async (req, res) => {
    try {
         // console.log(req.user.role)
        let items = await creditModel.find();
        res.render("creditList",{credits: items})
    }
    catch(err){
        console.log(err)
        res.send("couldnt retrieve purchase list")
    }
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