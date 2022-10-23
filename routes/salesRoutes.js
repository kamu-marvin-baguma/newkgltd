const express = require('express');
const router = express.Router();
const salesModel = require("../models/salesModel")
const connectEnsureLogin = require("connect-ensure-login")
const purchaseModel = require("../models/purchaseModel")


router.get('/sales', (req, res) => {
    res.render('salesForm',{
        title: "sales"
    })

});

// fetch sales from the db
router.get('/sales-list',
// connectEnsureLogin.ensureLoggedIn(),
//  IsManager||SalesAgent,
async (req, res) => {
   try{
     let items = await salesModel.find({
        branch:req.user.branch
     });
     //let totalPurchaseModel = await purchaseModel.aggregate([
     let totalSales = await salesModel.aggregate([
      {
        "$group": {
            _id:"$all",
            totalRevenue:{$sum:"$AmountPaid"},
            totalTonnage:{$sum:"$tonnage"}
        }
      }  
     ])
      // replicated
     let totalPurchases = await purchaseModel.aggregate([
        {
          "$group": {
              _id:"$all",
              totalExpense:{$sum:"$Costprice"},
              totalPurchaseTonnage:{$sum:"$tonnage"}
          }
        }  
       ])
     res.render('salesList',{
         sales: items,
        totalSales: totalSales[0],
        totalPurchase: totalPurchase[0]
    })
   }
   catch(err) {
    console.log(err)
    res.send("could not retrieve sales list")
   }
   
})
// edit routes
router.get("/editsales/:id",
    async (req, res) => {
        try{
           const currentSale = await salesModel.findOne({_id:req.params.id})
           res.render("editsale",{sale:currentSale})
      }
      catch(err){

      }
    })

    router.post("/editsales",
    async (req, res) => {
        try{
           await salesModel.findOneAndUpdate({_name:req.query.name},req.body)
           res.redirect("sales-list")
      }
      catch(err){

      }
    })


//delete route
router.post('/sales-delete',
async (req, res) => {
    try{
        await salesModel.deleteOne({
            _id: req.body._id
        })
        res.redirect('/sales-list')
    }
    catch(err) {
        console.log(err)
        res.status(400).send("could not delete sales")
    }
})
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




module.exports = router