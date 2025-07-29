const mongoose = require('mongoose');

require('dotenv').config()
function connect(){
    mongoose.connect(process.env.MONGO_URI)
}

module.exports = connect