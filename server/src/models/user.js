const mongoose = require('mongoose');


let usersschema = new mongoose.Schema({
    name:{
        required: [true,"Must provide name"],type:String},
    email:{type: String},
    url:{type:String},
    Phonenumber:{type:String, required: [true,"Must provide Number"]},
    address:{type:String,required: false},
    hash:{type:String,required:true},
    salt:{type:String,required:true},
    role:{
        type:String,
        default: "user"
    },
    cart:{type:Array},
    orders:{type:Array}
}, {
    collection:"Users",
    timestamps:true
})

let collection = mongoose.model('User',usersschema)

module.exports = collection