const mongoose = require('mongoose');

let itemschema = new mongoose.Schema({
    name:{type:String ,required:[true]},
    price:{type:Number, required:[true]},
    catg:{type:String },
    img:{type:Array, required:[true]},
    material:{type:String},
    orders: { type: Number, default: 0 }, // Number of times ordered
    quantity:{type:Number,required:[true], min: 0},
    desc:{type:String,required:[true]}
},{timestamps:true,collection:"Products"})

module.exports = mongoose.model("Products",itemschema)
