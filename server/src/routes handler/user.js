const Router = require('express').Router()
const {auth} = require("../utils/authpg.js")
const {patchuser,showprofile,register} = require('../controls/user.js')
const { isAuth, isunauth } = require('../utils/authunitace.js')
const jwt = require("jsonwebtoken");

Router.get('/logout', isAuth, function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).json({ 'msg': err })
        }
        res.clearCookie('connect.sid')
        res.json({ 'msg': 'logged out' }
            
        )
    })
})

Router.route("/register").all(isunauth).post(register,function (req,res){
    res.status(201).json({"msg": "User created" })
})

Router.route('/login').all(isunauth).post(auth, function (req, res) {
    req.session.user = req.user
    req.session.isauth = true
 //    let jwt = 'configre it idiot' 
    const accesstoken = jwt.sign({
        _id: req.session.user._id,
        email: req.session.user.email,
        role: req.session.user.role
    }
    ,
        process.env.JWT_SECRET,
        {
        expiresIn: "48h" 
        }
    );
    res.cookie('Secure_one','jwt',{httpOnly:true,secure: true})
    res.status(200).json({'us-va': true,'us-r':req.session.user.role == 'admin' ? 'cole' : 'nas', 'cid' :req.session.user.cr_id,token:accesstoken})

})

Router.route('/').get(isAuth, function (req, res) {
    res.status(200).json({'us-va': true,'us-r':req.session.user.role == 'admin' ? 'cole' : 'nas', 'cid' :req.session.user.cr_id})
})
Router.route('/profile').patch(isAuth, patchuser).get(isAuth,showprofile)
module.exports = Router