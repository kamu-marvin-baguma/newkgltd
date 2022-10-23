const mongoose = require("mongoose")
//the name of the input must be the same as the schema
//schema and model
const creditSchema =  mongoose.Schema({
    produceName: {
        type: String,
        required:true,
        trim:true,
        enum:['Beans', 'Maize Grain', 'G-nuts', 'cowpeas', 'Millet']
    },
    produceType : Number,
    nameOfDealer:String,
    salesAgent:String,
    amountDue:Number,
    tonnage: Number,
    dispatchDate: Date,
    dueDate: Date,
    location:String,
    contactNumber:String,
    nationalId:String
})

module.exports = mongoose.model("credit", creditSchema)  
// module.exports = produceModel 