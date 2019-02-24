export default [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        component: () => import('../views/index.vue'),
        children: [
            {
                path: '',
                component: () => import('../views/Home.vue')
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/Home.vue')
            },
            {
                path: '/userInfo',
                name: 'infoshow',
                component: () => import('../views/userInfo.vue')
            },
            {
                path: '/fundList',
                name: 'fundList',
                component: () => import('../views/fundList.vue')
            }
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register.vue')
    }, 
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
    }
]