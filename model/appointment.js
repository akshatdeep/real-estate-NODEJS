const mongoose = require("mongoose")


const appointments = mongoose.Schema({
    property:{type:mongoose.Schema.Types.ObjectId, ref:"propertys"},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"Users"},
    status:{type:String, enum:["scheduled", "completed", "canceled"]},
    date:Date
})


const appointment = mongoose.model("appointments", appointments)

module.exports = appointment;