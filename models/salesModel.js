const mongoose = require("mongoose")
//the name of the input must be the same as the schema
//schema and model
const salesSchema =  mongoose.Schema({
    produceName: {
        type: String,
        required:true,
        trim:true,
        enum:['Beans', 'Maize Grain', 'G-nuts', 'cowpeas', 'Millet']
    },
    produceType: String,
    salesAgent:String,
    tonnage: Number,
    amountPaid:Number,
    date: Date,
    time: String,
    nameOfDealer:String,

   
    branch: {
        type: String,
        required: true,
        trim:true,
        enum:['Kisasi', 'Namugongo',]
    }
})

module.exports = mongoose.model("sales", salesSchema)  
