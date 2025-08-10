const users = require('../models/user.js')
const {auth,gen} = require("../utils/authpg.js");


let regestier =  async function (req, res,next) {
    let hashsalt = gen(req.body.psswd);
    let user = await users.findOne({Phonenumber:req.body.Phonenumber}).then((user)=>user).catch((err)=>{console.log(err)})
    if(user){
        return res.json({ msg: 'User exixts' })
    }
    
      try {  
          await users.create({
          name: req.body.username,
          Phonenumber:req.body.Phonenumber,
          email: req.body.email,
          hash: hashsalt.hash,
          salt: hashsalt.salt,
        });}
      catch(err){
          console.log(err)
      };
      return next()
      ;}


let patchuser = async function (req,res,next){
    const userin = users.findById(req.session.user._id)
    let newfields = {}
    let updateduser = req.body
    for(field in updateduser){
        if(updateduser[field] != userin[field] ){
            newfields[field] = updateduser[field]
        }}
        let upuser = await users.findOneAndUpdate({_id:req.session.user._id},{$set: newfields},{new:true}).then((usero) =>{ req.session.user = usero 
            return usero})
    
        return res.json({
            message: "Profile updated successfully",
            user: upuser
        });
    }
    function showprofile(req, res) {
         if (!req.session.user) {
        return res.status(401).json({ error: "Not logged in" });
        }
        const { name, email, Phonenumber,url} = req.session.user;
        res.json({
            name,
            email,
            Phonenumber,
            url
        });
    }
module.exports = {patchuser,showprofile,regestier}