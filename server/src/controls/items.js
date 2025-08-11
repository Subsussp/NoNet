const items = require("../models/items")
const redis = require("../connections/redis.js");
let cloudinary = require('cloudinary').v2

const redisupdate = async function (req, res, next) {
    let data = await items.find({})
    redis.setEx('data', (60 * 60 * 48) ,JSON.stringify(data))
    res.end()
}

let getitems =async function (req,res,next){ // get every item
    let data = await items.find({})
    res.status(200).json(data)
    redis.setEx('data', (60 * 60 * 48) ,JSON.stringify(data))
}
let getitem = async function (req,res,next){ 
    let id = req.params.id
    let data = await items.findById(id)
    if(data){
        res.status(200).json(data)
        redis.setEx(`item-${req.params}`, (60 * 60 * 48) ,JSON.stringify(data))
    }
}
let getiteml = async function (id){ 
    let data = await items.findById(id)
    if(data){
        return data
    }else{
        return 'Out of Stock'
    }
}
// {
//     _id: '7654',
//         "data": {name: ,
//         price: ,
//         catg: ,
//         img: ,
//         material: ,
//         quantity:
//     }
// }
let patchitem = async function (req, res, next) {
    const itemin = items.findById(req.body._id)
    let newfields = {}
    let updateditem = req.body.data    
    for(field in updateditem){
        if(updateditem[field] != itemin[field]){
            newfields[field] = updateditem[field]
        }}
    let upitem = await items.findOneAndUpdate({ _id: req.body._id }, { $set: newfields }, { new: true })
    res.json(upitem)
    let data = await items.find({})
    redis.setEx('data', (60 * 60 * 48) ,JSON.stringify(data))
    redis.setEx(`item-${req.body._id}`,(60 * 60 * 48),JSON.stringify(upitem))
}


let additems = async function (req, res, next) {
    let newitems = []
    for (let item in req.body.data) {
        newitems.push( req.body.data[item])
    }
    await items.insertMany(newitems)
    res.send('created')
}
let additem = async function (req, res, next) {
    let newitem = await items.create({
        name:req.body.name,
        img:req.body.img,
        price: req.body.price,
        catg: req.body.catg,
        desc: req.body.desc,
        material:req.body.material,
        quantity:req.body.quantity
    })
    // res.status(201).end() 
    next()
}

let deleteitem =async function (req,res,next){
    try {
        let id = req.params.id
        const deletedItem = await items.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ msg: "Item not found" });
    
        // Delete images from Cloudinary (if any)
        if (deletedItem.img?.length) {
          await Promise.all(
            deletedItem.img.map((imgUrl) => {
              const publicId = imgUrl.split("/").pop().split(".")[0];
              return cloudinary.uploader.destroy(publicId);
            })
          );
        }
        redis.del(`item-${id}`)
        res.json({"msg": deletedItem })
        
    } catch (error) {
        res.sendStatus(401)
    }
}


module.exports = {getitem,getitems,patchitem,additems,additem,deleteitem,redisupdate,getiteml}