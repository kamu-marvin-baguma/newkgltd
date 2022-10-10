const express = require('express');
const router = express.Router();
const salesModel = require("../models/salesModel")

router.get('/sales', (req, res) => {
    res.render('salesForm',{
        title: "sales"
    })

});


router.get('/sales-list',async (req, res) => {
    const sales = await salesModel.find()
    res.render('salesList',{
        title: "salesList", sales: sales
    })

});

//error handling(try...catch)
router.post("/newSale", async (req,res)=>{
    try{
        const newSale = new salesModel(req.body)
        await newSale.save()
        res.redirect("/sales")
        console.log(req.body)
   }
   //you redirect to a path and you render a file.
   catch(err){
    res.status(400).render("salesForm")
   }
   
})

// router.get("/sales-list",async(res.req)=>{
//     try{
//         let sales = await salesModel.find()
//         res.render("salesList",{sales : items})
//     }
//     catch(err){
//         console.log(err)
//         res.send("could not retrieve sales list")
//     }
// })

router.post("/newSale",async (req, res) => {
    try {
        const newSale = new salesModel(req.body)
        await newSale.save()
        res.redirect("/sales-list")
        console.log(req.body)
    }
    catch (err) {
        res.status(400).render("salesForm")
        console.log(err)
    }
})


module.exports = router