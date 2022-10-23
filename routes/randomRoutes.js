const express = require("express")
const passport = require("passport");
const workerModel = require("../models/workerModel")
const multer = require('multer');
const salesModel = require('../models/salesModel')
// const imageModel = require("../models/imageModel")
const connectEnsureLogin = require("connect-ensure-login");
const{isManager, isManagerOrSalesAgent} = require("./auth");
const { isDirector, isSalesAgent } = require("./auth");

const router = express.Router()



// Generate a random number to name
const name = ()=> Math.floor(Math.random()*10000);


// Working with multer diskStorage method
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images/');
   },
    filename: function(req, file, cb){
        cb(null, name() + file.originalname);
       //  console.log(file);
    }
});

const fileFilter = (req, file, cb)=>{
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    } 
}
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 7},
    fileFilter: fileFilter
});

// router.get("/managerDash", connectEnsureLogin.ensureLoggedIn(), isManager,
//   async(req,res)=>{
//     try{
//         // let purchaseList = []
//         // if(req.user.branch === 'Kisasi',{
//         //     purchaseList = await purchaseModel.find({
//         //       branch:'Kisasi'
            
//         //     }elseif (req.user.branch === 'Namugongo'){
//         //     purchaseList = await purchaseModel.find{
//         //       branch:'Namugongo'
//         //  }
//         // })
//                 // console.log(req.user)
//         res.render("managerDash",{
//             purchase:purchaseList,
//         //     // fullname:req.user.fullname + " " + req.user.fullname,
//         //     // email:req.user.email,
//         //     // branch:req.user.branch,
//         //     // role:req.user.role,
//         // }   

    
//     catch(err){
//         console.log(err)
//         res.send("Oops! Access Denied, Login to continue")
//     }
    
// })
router.get("/managerDash", connectEnsureLogin.ensureLoggedIn(),isManager,
async(req,res)=>{
    try{
        console.log(req.user)
        const items = await salesModel.find({}).sort({amountPaid: -1}).limit(10)
        res.render("managerDash",{
            fullname:req.user.fullname + " " + req.user.fullname,
            email:req.user.email,
            branch:req.user.branch,
            role:req.user.role,
            item:items
        })

    }
    catch(err){
        console.log(err)
        res.send("Oops! Access Denied, Login to continue")
    }
    
})


router.get("/directorDash", connectEnsureLogin.ensureLoggedIn(),isDirector,
async(req,res)=>{
    try{
        console.log(req.user)
        res.render("directorDash",{
            fullname:req.user.fullname + " " + req.user.fullname,
            email:req.user.email,
            branch:req.user.branch,
            role:req.user.role,
        })

    }
    catch(err){
        console.log(err)
        res.send("Oops! Access Denied, Login to continue")
    }
    
})

router.get("/salesDash", connectEnsureLogin.ensureLoggedIn(),isSalesAgent,
(req,res)=>{
    res.render("salesDash")
})

router.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login")
    })
    
})


router.get("/gallery", async(req,res)=>{
    try{
        const images = await imagesModel.find()
        res.render("gallery",{images})
    }catch(error){

    }
})
router.get("/uploads",(req,res)=>{
    res.render("uploads")
})

router.post("/uploads",upload.single("image"),
(req,res) => {
    console.log(req.file)
    imageModel.create({image:req.file.path})
    res.redirect("/gallery")
})




module.exports = router