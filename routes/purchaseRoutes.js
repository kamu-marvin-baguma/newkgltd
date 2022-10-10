const express = require('express');
const router = express.Router();
const purchaseModel = require("../models/purchaseModel")

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
        res.render("purchaseList",{purchase: items})
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
router.get('/editpurchase/:id',
 async(req, res) => {
  try {
  const currentWorker = await purchaseModel.findById({_id:req.params.id})
  res.render('editpurchase', {purchase:currentPurchase})
  }
  catch(err) {

  }
    
  })

router.post("/editpurchase",
async (req,res)=>{
 try{
     await purchaseModel.findByIdAndUpdate({_id:req.query.id}.req.body)
     res.redirect("/worker-list")
}
//you redirect to a path and you render a file.
catch(err){
}
})


//error handling(try...catch)
router.post("/newPurchase", async (req,res)=>{
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