import axios from './index'

const loginUser = (data) => {
    return axios.request({
        url: '/apis/users/login',
        method: 'post',
        data
    })
}
const register = (data) => {
    return axios.request({
        url: '/apis/users/register',
        method: 'post',
        data
    })
}

export {
    loginUser,
    register,
    test
}
