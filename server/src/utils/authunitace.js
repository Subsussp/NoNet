const Users = require('../models/user.js')


let isAuth = function (req, res, next) {
    if(req.session.user){
        return next()
    }else{
        return res.status(200).json({'msg':'forbidden','valid' :false})
    }
} 
let isAdmin = async function (req, res, next) {
    if (req.session.user) {
        let user = await Users.findById(req.session.user._id)
        if (req.session.user && req.session.user.role == 'admin' || user.role == 'admin') {
            return next()
        } else {
            return res.status(401).json({'msg': 'Not auth'})
        }
    }
    res.status(403).json({'msg': 'not logged'})
} 

let isunauth = function (req,res,next){
    if (!req.session.isauth) {
        return next()
    } else {
        return res.status(401).json({'msg':'forbidden',"valid": true})
    }
} 


module.exports = {isunauth,isAuth,isAdmin}