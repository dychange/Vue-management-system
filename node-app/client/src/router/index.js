import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const router = new Router({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.elToken ? true : false
    if(to.path == '/login' || to.path == '/register') {
        next()
    } else {
        isLogin ? next() : next('/login')
    }
})

export default router