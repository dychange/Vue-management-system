const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs') //使用bcrypt加密
const query = require('../../config/db/query')
const formateTime = require('../../libs/formateTime')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../../config/keys')
const passport = require('passport')


//  注册接口 route: apis/users/register
router.post('/register', (req, res) => {
    const saltRounds = 10;
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let gAvatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })
    let identity = req.body.identity
    let avatar = 'http:' + gAvatar
    const current = formateTime(new Date().getTime())
    query(`SELECT email FROM users WHERE email = ?`, email)
        .then(data => {
            if (data.length !== 0 && data[0].email === email) {
                res.status(400).json({
                    msg: '改用户已被注册'
                })
            } else {
                bcrypt.hash(password, saltRounds).then(hash => {
                    password = hash
                    query(`INSERT INTO users (name,email,password,date,avatar,identity)
                        VALUES ('${name}', '${email}', '${password}',
                            '${current}', '${avatar}', '${identity}')`)
                        .then(data => {
                            res.status(200).json({
                                msg: 'success'
                            })
                        })
                        .catch(err => console.log(err))
                })
            }
        })
        .catch(err => console.log(err))
})

//  登陆接口 route: apis/users/login
//  登陆成功返回Token
router.post('/login', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    query(`SELECT * FROM users WHERE email = ?`, email)
        .then(data => {
            if (data.length === 0) {
                return res.status(404).json({
                    msg: '此用户不存在'
                })
            }
            bcrypt.compare(password, data[0].password).then(isMatch => {
                if (isMatch) {
                    const rule = {
                        id: data[0].id, 
                        name: data[0].name, 
                        identity: data[0].identity,
                        avatar: data[0].avatar
                    }
                    jwt.sign(rule, secretKey, {expiresIn: 3600},(err,token) => 
                        {
                            if(err) throw err 
                            else {
                                res.status(200).json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            }
                        })
                } else {
                    return res.status(400).json({
                        msg: '密码错误'
                    })
                }
            });
        })
        .catch(err => console.log(err))

})

//  验证Token, 从而可以拿到用户信息 route: apis/users/current
router.get('/current', passport.authenticate('jwt', { session: false } ), (req, res) => {
    res.json({
        id: req.user[0].id,
        name: req.user[0].name,
        email: req.user[0].email,
        identity: req.user[0].identity
    })
})

module.exports = router