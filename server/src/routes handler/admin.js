const Router = require('express').Router()
const Order = require("../models/Order.js");
const items = require("../models/items.js");
const Users = require("../models/user.js");
// const redis = require("../connections/redis.js");


require('dotenv').config()
// stats instead of gate
Router.route('/Gate').get(async function (req,res,next) {
        const Orders = await Order.find();
        const totalUsers = await Users.countDocuments();
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startOfYesterday = new Date(startOfToday);
        startOfYesterday.setDate(startOfYesterday.getDate() - 1);
        const twoWeeksAgo = new Date(startOfToday);
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        const startOfDayBeforeYesterday = new Date(startOfYesterday);
        startOfDayBeforeYesterday.setDate(startOfDayBeforeYesterday.getDate() - 1);

        // Total Orders
        const totalOrders = await Order.countDocuments();

      // Total Orders from two weeks ago
      const totalOrdersTwoWeeksAgo = await Order.countDocuments({
        createdAt: { $lt: twoWeeksAgo }
      });

        // Total Users
        const totalUsersYesterday = await Users.countDocuments({
          createdAt: { $lt: startOfToday }
        });

        const calcChange = (today, yesterday) => {
          if (yesterday === 0) return today > 0 ? 100 : 0;
          return (((today - yesterday) / yesterday) * 100).toFixed(2);
        };

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start on Sunday
      startOfWeek.setHours(0, 0, 0, 0);

      const last7DaysSales = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfWeek }
          }
        },
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" }, // 1 = Sunday, 7 = Saturday
            totalSales: { $sum: "$totalAmount" },
            orderCount: { $sum: 1 }
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      // Build array with all 7 days, filling missing days with zeros
      const salesByDay = Array(7).fill(null).map((_, index) => ({
        day: dayNames[index],
        totalSales: 0,
        orderCount: 0
      }));

      last7DaysSales.forEach(day => {
        salesByDay[day._id - 1] = {
          day: dayNames[day._id - 1],
          totalSales: day.totalSales,
          orderCount: day.orderCount
        };
      });

        const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]);
        res.json({
          Orders,
          totalOrdersChange: calcChange(totalOrders, totalOrdersTwoWeeksAgo),
          salesByDay,
          totalUsers,
          totalUsersChange: calcChange(totalUsers, totalUsersYesterday),
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