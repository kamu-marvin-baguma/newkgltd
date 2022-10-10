const express = require("express")
const workerModel = require("../models/workerModel")
const connectEnsureLogin = require("connect-ensure-login")

const router = express.Router()


router.get('/worker', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  if (req.user.role === "manager" || req.user.role === "salesAgent"){
    res.render('worker')
  }
  else {
    res.render('managerDash')
  }
  

});


router.get("/worker-list", connectEnsureLogin.ensureLoggedIn(), async(req, res)=> {
  const workers = await workerModel.find()
  res.render("workerList",{
    title: "worker", workers: workers
  })
  
  // res.send("employees")    
})



//edit route
router.get('/editworker/:id', connectEnsureLogin.ensureLoggedIn(),
 async(req, res) => {
  try {
  const currentWorker = await workerModel.findById({_id:req.params.id})
  res.render('editworker', {worker:currentWorker})
  }
  catch(err) {

  }
    
  })

  router.post("/editworker", connectEnsureLogin.ensureLoggedIn(),
   async (req,res)=>{
    try{
        await workerModel.findByIdAndUpdate({_id:req.query.id}.req.body)
        res.redirect("/worker-list")
   }
   //you redirect to a path and you render a file.
   catch(err){
   }
})


//error handling(try...catch)
router.post("/newWorker", async (req,res)=>{
    try{
        const newWorker = new workerModel(req.body)
        await newWorker.save()
        res.redirect("/worker-list")
        console.log(req.body)
   }
   //you redirect to a path and you render a file.
   catch(err){
    res.status(400).render("workerForm")
   }
})


module.exports = router