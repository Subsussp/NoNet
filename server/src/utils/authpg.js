const crypto = require('crypto')
const Users = require('../models/user.js')

async function auth(req,res,next){
    let psswd = req.body.psswd
    try{
        const user = await Users.findOne({email:req.body.email}).then((user) => user).catch((err) => {
            return console.log("Error: " + err)})
        if (user) {
            let salt = user.salt
            let hashed = crypto.pbkdf2Sync(psswd, salt, 64, 64, 'sha-512').toString('hex')
            if (hashed == user.hash) {
                req.user = user
                return next()
            } else {
                return res.json({ 'isauth':false,'msg': "not auth"})
            }
        } else {
            return res.json({'isauth':false , 'msg': "user does not exists"})
        }

    }catch (err){
         console.log("Error: " + err)
    }
} 
function gen(password){
    let salt = crypto.randomBytes(32).toString('hex')
    let hash = crypto.pbkdf2Sync(password,salt,64,64,'sha512').toString('hex')
    return {
        salt,
        hash
    }
}

function datavalid(req,res,next){
     //DATA VALIDITION DONE BY THE FRONTEND
        return next()
}

module.exports = {auth,datavalid,gen}