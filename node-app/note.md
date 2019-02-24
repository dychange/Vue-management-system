jwt: 
1. jwt.sign("规则", "加密名字", "过期时间", "箭头函数")
2. router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {})  验证Token
3. 后台给前台发Token， 前台每次请求的时候都要在Headers里添加Authorization: Token

使用图片/gif作为背景 盒子先撑满 overflow: hidden，图片再宽高100%

如果要将两个块状元素并排到一列，改变display: inline-block
子决父相， 子元素可以使用top,left等定位
如果在一个div在一个背景图上无法定位，使用 position: relative再定位

前端对于token,导航守卫，vueX的处理
1. 配置全局守卫，如果没有登录,没有Token 则不能进入/index， 跳转到登录页
2. 在拦截请求时，将Token 放到header字段里去， 
   响应拦截时判断token是否过期，用401状态码判断
   如果过期则在localstorage 里删除对应的Token
3. 用插件 jwt-decode解析Token, 将解析后的值存入VueX中