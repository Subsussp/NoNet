const Router = require('express').Router()
const redis = require("../connections/redis.js");
const items = require("../models/items.js");
const {getitems,additems,patchitem,deleteitem,additem,redisupdate,getitem} = require('../controls/items.js');
const { isAdmin } = require('../utils/authunitace.js');


require('dotenv').config()

Router.route('/').get(function (req, res, next) {
    redis.get('data').then((r) => {
        if (r) {
          res.json(JSON.parse(r))
      } else {
          next()
      }
    })
  }, getitems).post(isAdmin,additem,redisupdate).patch(isAdmin,patchitem)
Router.route('/:id').get(async function (req,res){ 
  const id = req.params.id
  redis.get(`item-${req.params.id}`).then(async (r) => {
    if(r){
      return res.json(JSON.parse(r))
    }
    let data = await items.findOne({_id:id}).catch((err) => console.log("err "+ err))
    if(data){
      redis.setEx(`item-${req.params.id}`, (60 * 60 * 48) ,JSON.stringify(data))
      return res.status(200).json(data)
    }
    res.status(404).json({"msg":'nodata'})  
  })
}).delete(isAdmin,deleteitem)
// {)

module.exports = Router