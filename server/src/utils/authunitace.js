const Users = require('../models/user.js')
const jwt = require("jsonwebtoken");
let isAuth =async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if(req.session.user){
        return next()
    }
    else if(authHeader){
        try {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!req.session.user){
                const user = await Users.findOne({_id:decoded._id}).then((user) => user)
                if (user) {
                    req.user = user
                    req.session.user = user
                    req.session.isauth = true
                }
        }
            return next();
        } 
        catch (err) {
            return res.json({ 'isauth':false,'msg': "not auth"})
        }
    }    
    else{
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

let isunauth =async function (req,res,next){
    const authHeader = req.headers.authorization;
    if(authHeader){
        try {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!req.session.user){
                const user = await Users.findOne({_id:decoded._id}).then((user) => user)
                if (user) {
                    req.user = user
                    req.session.user = user
                    req.session.isauth = true
                }
        }
        } catch(err){
            console.log(err)
        }
    }
    if (!req.session.isauth) {
        return next()
    } else {
        return res.status(401).json({'msg':'forbidden',"valid": true})
    }
} 


module.exports = {isunauth,isAuth,isAdmin}