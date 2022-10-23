const express = require('express');
const router = express.Router();
const purchaseModel = require("../models/purchaseModel")
const salesModel = require("../models/salesModel")


router.get('/purchase', (req, res) => {
    res.render('purchaseForm',{
        title: "purchase"
    })

});


router.get('/purchase-list',
async (req, res) => {
    try {
         // console.log(req.user.role)
        let items = await purchaseModel.find();
        res.render("purchaseList",{purchases: items})
    }
    catch(err){
        console.log(err)
        res.send("couldnt retrieve purchase list")
    }
})

//delete routes
router.post('/purchase-list', 
async (req, res) => {
    try {
        await purchaseModel.deleteOne({
            _id: req.body._id
        })
        res.redirect("purchase-list")
}
catch(err){
    res.status(400).render("purchaseForm")
   }


})

//edit route
router.get('/edit',
 async(req, res) => {
  try {
  const currentPurchase = await purchaseModel.findById({_id:req.params.id})
  res.render('editPurchase', {purchase:currentPurchase})
  }
  catch(err) {

  }
    
  })

router.post("/editPurchase",
async (req,res)=>{
 try{
     await purchaseModel.findByIdAndUpdate({_id:req.query.id}.req.body)
     res.redirect("/purchase-list")
}
//you redirect to a path and you render a file.
catch(err){
}
})

// db.collection.find().limit(2).sort({$natural:-1})

//error handling(try...catch)
router.post("/newPurchase", async (req,res)=>{
    
    // let items = await Purchases.find( ).sort({$natural:-1})
 try{
     const newPurchase = new purchaseModel(req.body)
     await newPurchase.save()
     res.redirect("/purchase-list")
     console.log(req.body)
}
//you redirect to a path and you render a file.
catch(err){
 res.status(400).render("purchaseForm")
 console.log(err)
}
})









module.exports = router