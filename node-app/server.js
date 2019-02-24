const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport') 
const port = process.env.PORT || 3000

//  bodyParser 配置
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// 使用passport 
app.use(passport.initialize())
require('./config/passport')(passport)

// 路由
app.use('/apis/users', require('./routes/api/users'))
app.use('/apis/profile', require('./routes/api/profile'))


app.listen(port, () => console.log(`Server running on port ${port}`)
)