const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    user_id:{
        type:String
    },
    title:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps: true})

module.exports = mongoose.model("Note", noteSchema)

