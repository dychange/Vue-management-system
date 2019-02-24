import axios from './index'

const getProfile = () => {
    return axios.request({
        url: '/apis/profile',
        method: 'get'
    })
}

export {
    getProfile
}