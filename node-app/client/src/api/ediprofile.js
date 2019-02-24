import axios from './index'
const editProfile = (data,id) => {
    return axios.request({
        url: `/apis/profile/update/${id}`,
        method: 'post',
        data
    })
}

export {
    editProfile
}