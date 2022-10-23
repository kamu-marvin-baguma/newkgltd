const mongoose = require("mongoose")
//the name of the input must be the same as the schema
//schema and model
const produceSchema =  mongoose.Schema({
    produceName: {
        type: String,
        required:true,
        trim:true,
        enum:['Beans', 'Maize Grain', 'G-nuts', 'cowpeas', 'Millet']
    },
    produceType:String,
    nameOfBuyer:String,
    sellingPrice:Number,
    costOfProduce:Number,
    tonnage: Number,
    Date: Date,
    time: String,
    contactNumber:Number,
    
branch: {
    type: String,
    required: true,
    trim:true,
    enum:['Kisasi', 'Namugongo',]
}

})

module.exports = mongoose.model("produces", produceSchema)  
// module.exports = produceModel 