
const OrderRout = require('express').Router()
const Order = require("../models/Order.js");
const items = require("../models/items.js");
const Users = require("../models/user.js");
// const redis = require("../connections/redis.js");


require('dotenv').config()
OrderRout.route('/').get(async function (req,res) {
    let orders =await Order.find()
    return res.json({data:orders})
})
OrderRout.route('/process').post(async function (req,res,next) {
 try {
    const userId = req.session?.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await Users.findById(userId).populate('cart.product');
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    const orderItems = await  Promise.all(user.cart.map(async (obj) => {
    const quantity = obj.m || 1;
    const item = await items.findByIdAndUpdate(
      obj.id,
      { $inc: { orders: quantity } },   
      { new: true }).select('name price _id');
return {
      name:item.name,
      product: item._id,
      price: item.price,
      quantity: quantity,
    }}))
    console.log(orderItems)
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const {
  firstName,
    lastName,
    email,
    phone,
    address,
    city,
    coords,
    zipCode,
    zipCode2,
    country,
    paymentMethod,
    cardNumber,
    cardExpiry,
    cardCvc 
    } = req.body;

    const fullName = `${firstName} ${lastName}`;

    // Create the order
    const newOrder = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      paymentMethod,
      shippingAddress: {
        fullName,
        address,
        coords,
        email,
        city,
        country,
        zipCode,
        zipCode2,
        phone,
      },
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    // Clear user's cart after order creation
    user.cart = [];
    user.orders.push({orderid:newOrder._id,date: new Date()});
    await user.save();
    console.log(newOrder)
    res.status(201).json({ message: 'Order created', order: newOrder });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}).patch(async function (req,res,next) {
    let id = req.body._id
    let reqstatus = req.body.status

    try {
        let updatedOrder = await Order.findByIdAndUpdate(id,{'$set':{'orderStatus': reqstatus}})
        console.log(updatedOrder)
        return res.status(202).end()
    } catch (error) {
        console.log(error)
        return res.status(404).end()
    }
})


module.exports = OrderRout