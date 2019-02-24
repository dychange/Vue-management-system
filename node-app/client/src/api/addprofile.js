import axios from './index'
const addProfile = (data) => {
    return axios.request({
        url: '/apis/profile/add',
        method: 'post',
        data
    })
}
export {
    addProfile
}