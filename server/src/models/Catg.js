const mongoose = require('mongoose');

let itemschema = new mongoose.Schema({
    Catgs:{type:Array,required:[true]}
},{timestamps:false,collection:"Catg"})

module.exports = mongoose.model("Catg",itemschema)
