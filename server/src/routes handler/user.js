const Router = require('express').Router()
const {auth} = require("../utils/authpg.js")
const {patchuser,showprofile,regestier} = require('../controls/user.js')
const { isAuth, isunauth } = require('../utils/authunitace.js')

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

Router.route("/register").all(isunauth).post(regestier,function (req,res){
    res.status(201).json({"msg": "User created" })
})

Router.route('/login').all(isunauth).post(auth, function (req, res) {
    req.session.user = req.user
    req.session.isauth = true
 //    let jwt = 'configre it idiot' 
    res.cookie('Secure_one','jwt',{httpOnly:true,secure: true})
    res.status(200).json({'us-va': true,'us-r':req.session.user.role == 'admin' ? 'cole' : 'nas', 'cid' :req.session.user.cr_id})
})

Router.route('/').get(isAuth, function (req, res) {
    res.status(200).json({'us-va': true,'us-r':req.session.user.role == 'admin' ? 'cole' : 'nas', 'cid' :req.session.user.cr_id})
})
Router.route('/profile').patch(isAuth, patchuser).get(isAuth,showprofile)
module.exports = Router