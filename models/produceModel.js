const mongoose = require("mongoose")
//the name of the input must be the same as the schema
//schema and model
const produceSchema =  mongoose.Schema({
    produceName:String,
    nameOfBuyer:String,
    nameOfDealer:String,
    sellingPrice:Number,
    costOfProduce:Number,
    tonnage: Number,
    Date: Date,
    time: String,
    contactNumber:Number,
    branchName:String,
})

module.exports = mongoose.model("produces", produceSchema)  
// module.exports = produceModel 