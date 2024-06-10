const mongoose = require("mongoose")


const propertys = mongoose.Schema({
    title:String,
    description:String,
    price:String,
    location:String,
    image:String,
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"Users"},
    status:{type:String, enum:["available", "sold", "pending"]}
})

const property = mongoose.model("propertys", propertys)

module.exports = property