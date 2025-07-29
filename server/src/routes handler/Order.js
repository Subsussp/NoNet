
const OrderRout = require('express').Router()
const Order = require("../models/Order.js");
const items = require("../models/items.js");
const Users = require("../models/user.js");
// const redis = require("../connections/redis.js");


require('dotenv').config()
// stats instead of gate
OrderRout.route('/').get(
)

OrderRout.route('/').get(
)
OrderRout.route('/Proccess').get(async function (req,res,next) {
    res.status(200).json({"Proccess": "Proccess"});
})


module.exports = OrderRout