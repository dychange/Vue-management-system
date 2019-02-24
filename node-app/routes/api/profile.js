const express = require('express')
const router = express.Router()
const query = require('../../config/db/query')
const passport = require('passport')
const formateTime = require('../../libs/formateTime')

//  添加信息, 先验证用户Token，然后添加信息 route: apis/profile/add
router.post('/add', passport.authenticate('jwt', { session: false } ), (req, res) => {
    let type = req.body.type
    let descript = req.body.descript
    let income = req.body.income
    let expend = req.body.expend
    let cash = req.body.cash
    let remark = req.body.remark
    let current = formateTime(new Date().getTime())

    query(`INSERT INTO profile (type,descript,income,expend,cash,remark,date)
            VALUES('${type}', '${descript}', '${income}',
            '${expend}', '${cash}', '${remark}', '${current}')
            `)
        .then(data => {
            res.status(200).json({
                msg: 'success'
            })
        })
        .catch(err => console.log(err))
})


//  获取所有信息， 先验证用户Token ,  route: apis/profile
router.get('/', passport.authenticate('jwt', { session: false } ), (req, res) => {
    query(`SELECT * FROM profile`)
        .then(data => {
            if(data.length === 0) {
                return res.status(404).json({
                    msg: '没有任何内容'
                })
            }
            res.status(200).json({
                msg: data
            })
        })
        .catch(err => console.log(err))
})


//  获取单个信息， 先验证用户Token, route: apis/profile/:id
router.get('/:id', passport.authenticate('jwt', { session: false } ), (req, res) => {
    query(`SELECT * FROM profile WHERE id = ? `, req.params.id)
        .then(data => {
            if(data.length === 0) {
                return res.status(404).json({
                    msg: '没有找到内容'
                })
            }
            res.status(200).json({
                msg: data
            })
        })
        .catch(err => console.log(err))
})


// 更新信息, 先验证用户Token, route: apis/profile/update
router.post('/update/:id', passport.authenticate('jwt', { session: false }), (req,res) =>{
    let type = req.body.type
    let descript = req.body.descript
    let income = req.body.income
    let expend = req.body.expend
    let cash = req.body.cash
    let remark = req.body.remark
    query(`UPDATE profile SET type = '${type}', descript = '${descript}',
             income = '${income}', expend = '${expend}', cash = '${cash}',
             remark = '${remark}' WHERE id = '${req.params.id}'
        `)
        .then(data => {
            console.log(data)
            res.status(200).json({
                msg: 'success'
            })
        })
        .catch(err => console.log(err))
})


// 删除信息, 先验证用户Token, route: apis/profile/delete
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req,res) =>{
    query(`DELETE FROM profile WHERE id = ?`, req.params.id)
        .then(data => {
            res.status(200).json({
                msg: 'success'
            })
        })
        .catch(err => console.log(err))
})
module.exports = router