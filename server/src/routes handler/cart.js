const Router = require('express').Router()
const { default: mongoose, get } = require('mongoose');
const items = require("../models/items.js");
const users = require("../models/user.js");
const {isAdmin, isAuth} = require('../utils/authunitace.js');
const { getiteml } = require('../controls/items.js');
const db = mongoose.connection;
// const redis = require("../connections/redis.js");
require('dotenv').config()
Router.route('/add-to-cart').get(isAuth,async function (req,res,next) {
    //token validition middleware
    let itemid = req.query.pr_id
    let item = await items.findById(itemid)
    let user 
    if(itemid == ''){
        return res.status(404).send('error')
    }
    if(item){
        let pre = await users.findById({_id:req.session.user._id})
        user = pre
        let found = pre.cart.filter((e)=>e.id == itemid)[0]
        if(found != '' && found != undefined){
            await users.updateOne({ _id:req.session.user._id, "cart.id": item._id },{ $set: { "cart.$.m" : (found.m + 1) } })
        }else{
            await users.findByIdAndUpdate({_id:req.session.user._id},{$addToSet:{cart:{id:item._id,m:1}}})
        }
     }
    res.json({'succ':'true'})
    
})
async function gets(id,inder) {
    let obj = await getiteml(id)
    return {data: obj ,nun:inder}  
}
Router.route('/').get(isAuth ,async function (req,res,next) {
    let user = await users.findOne({_id:req.session.user._id})
    let reques = []
    for(let i =0;i < user.cart.length;i++){
        let shit = await gets(user.cart[i]['id'],user.cart[i]['m'])
        if (shit.data == 'Out of Stock' ){
            await users.updateOne({_id:req.session.user._id},{$pull:{cart: {id:user.cart[i]['id']}}})
        } else{
            reques.push(shit) 
        }        
    }
    res.json(reques)
}).delete(isAuth,async function (req,res){
    let finid = new mongoose.Types.ObjectId(req.body.id);
    try {
        let respi = await users.updateOne({_id:req.session.user._id},{ $pull: {cart: { id: finid } }},);  
        res.send(respi) 
        return
    } catch (error) {
        res.sendStatus(400)
    }
    
}).patch(isAdmin)

module.exports = Router