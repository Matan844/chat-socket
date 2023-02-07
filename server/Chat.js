const mongoose = require("mongoose")
const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true ,
    },
    message:{
        type : String,
        required: true,
    },
    room:{
        type : String,
        required: true,
    }
})
module.exports = mongoose.model("chat",chatSchema)
