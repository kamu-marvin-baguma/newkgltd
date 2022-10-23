const express = require('express');
const router = express.Router();
const produceModel = require("../models/produceModel")
const{isManager} = require("./auth")
const connectEnsureLogin = require("connect-ensure-login")

router.get('/produce', connectEnsureLogin.ensureLoggedIn(),isManager,
async(req, res) => {
    if (req.user.role === "manager" || req.user.role === "director "){
    res.render('produceForm')}
    else {
        res.redirect("/managerDash")
    }

});



router.get('/produce-list',
async (req, res) => {
    try {
         // console.log(req.user.role)
        let items = await produceModel.find({branch:req.user.branch});
        res.render("produceList",{produces: items})
    }
    catch(err){
        console.log(err)
        res.send("couldnt retrieve produce list")
    }
})

//delete routes
router.post('/produce-list', 
async (req, res) => {
    try {
        await produceModel.deleteOne({
            _id: req.body._id
        })
        res.redirect("produce-list")
}
catch(err){
    res.status(400).render("produceForm")
   }


})


//edit route
router.get('/editProduce',
 async(req, res) => {
  try {
  const currentProduce = await produceModel.findById({_id:req.params.id})
  res.render('editProduce', {produce:currentProduce})
  }
  catch(err) {

  }
    
  })

  router.post("/editProduce",
  async (req,res)=>{
   try{
       await produceModel.findByIdAndUpdate({_id:req.query.id}.req.body)
       res.redirect("/produce-list")
  }
  //you redirect to a path and you render a file.
  catch(err){
  }
  })
  
  // db.collection.find().limit(2).sort({$natural:-1})
  
  //error handling(try...catch)
  router.post("/newProduce", async (req,res)=>{
      
      // let items = await Purchases.find( ).sort({$natural:-1})
   try{
       const newProduce = new produceModel(req.body)
       await newProduce.save()
       res.redirect("/produce-list")
       console.log(req.body)
  }
  //you redirect to a path and you render a file.
  catch(err){
   res.status(400).render("produceForm")
   console.log(err)
  }
  })
  





module.exports = router