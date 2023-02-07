const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true ,
    },
    password :{
        type : String,
        required: true,
    }
})


module.exports = mongoose.model("User1",userSchema)