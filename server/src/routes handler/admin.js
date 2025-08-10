const Router = require('express').Router()
const Order = require("../models/Order.js");
const items = require("../models/items.js");
const Users = require("../models/user.js");
// const redis = require("../connections/redis.js");


require('dotenv').config()
// stats instead of gate
Router.route('/Gate').get(async function (req,res,next) {
        const totalOrders = await Order.countDocuments();
        const activeSessions = await Order.db.collection('sessions').countDocuments();
        const uniqueUserIds = new Set();
activeSessions.forEach((session) => {
  // Parse session data - depends on how you store user info inside the session document
  const sessionData = JSON.parse(session.session); // or session.data depending on your schema
  if (sessionData.user._id) {
    uniqueUserIds.add(sessionData.user._id);
  }
});
        const totalUsers = uniqueUserIds.size;
        const last12MonthsSales = await Order.aggregate([
            {
              $match: {
                createdAt: {
                  $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) // Last 12 months
                }
              }
            },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year-month
                totalSales: { $sum: "$totalPrice" }, // Sum of totalPrice
                orderCount: { $sum: 1 } // Count of orders
              }
            },
            { $sort: { _id: 1 } } // Sort by month
          ]);
        const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
        res.json({
          totalOrders,
          last12MonthsSales,
          totalUsers,
          totalRevenue: totalRevenue[0]?.total || 0
        });
})

Router.route('/Users').get(async function (req,res,next) {
    let allusers = (await Users.find({})).map((onw)=>{
       let user = onw.toObject()
        delete user._id;
        delete user.hash;
        delete user.salt;
        delete user.email;
        delete user.cart;
        delete user.updatedAt;
        return user
    })
    res.status(200).json(allusers);
})
Router.route('/Products').get(async function (req,res,next) {
    res.status(200).json({"Products": "products page"});
})


module.exports = Router