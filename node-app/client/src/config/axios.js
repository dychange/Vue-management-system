import {startLoading,endLoading} from '../libs/loading';
import router from '../router/index'
import {Message} from 'element-ui'
const axios = require('axios')
const {baseURL} = require('./index')

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseURL = baseUrl
        this.queue = [] //定义一个队列用来存贮请求
    }
    getInsideConfig() {
        const config = {
            baseURL : this.baseURL,
            headers: {

            }
        }
        return config
    }
    //  拦截器
    interceptors(instance, url) {
        //  请求拦截
        instance.interceptors.request.use(config => {
            //  如果队列中没有请求则开始加载动画
            console.log('请求拦截：',config)
            startLoading()
            
            // 将Token设置到headers中
            if(localStorage.elToken)
                config.headers.Authorization = localStorage.elToken

            return config
        }, err => {
            return Promise.reject(err)
        })

        // 响应拦截
        instance.interceptors.response.use(res => {
            endLoading()
            return res
        }, err => {
            endLoading()
            let {msg} = err.response.data
            let {status} = err.response
            console.log('状态码：',status)
            Message.error(`${msg}`);

            // 处理过期的Token
            if(status === 401) {
                Message.error('token值无效，请重新登录')
                localStorage.removeItem('elToken')
                router.push('/login')
            }

            return Promise.reject(err)
        })
    }
    request(options, url) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, url)
        return instance(options)
    }
}

export default HttpRequest