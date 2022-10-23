const mongoose = require("mongoose")
//the name of the input must be the same as the schema
//schema and model
const purchaseSchema =  mongoose.Schema({
    produceName: {
        type: String,
        required: true,
        trim:true,
        enum:['Beans', 'Maize Grain', 'G-nuts', 'cowpeas', 'Millet']
    },
    typeOfProduce:String,
    nameOfBuyer:String,
    PurchasedOn:String,
    tonnage: Number,
    price: Number,
    Costprice:Number,
    contact:Number,
    Selling:Number,

   
    branch: {
        type: String,
        required: true,
        trim:true,
        enum:['Kisasi', 'Namugongo',]
    }

})

module.exports = mongoose.model("purchase", purchaseSchema)  
// module.exports = produceModel 
