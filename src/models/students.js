const mongoose = require("mongoose");
const validator = require("validator");

const reSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true, "Already Present!!!"]
    },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
})

// now we need to create a new Collection

const RestRegister = new mongoose.model('Restregister', reSchema);

module.exports = RestRegister; 